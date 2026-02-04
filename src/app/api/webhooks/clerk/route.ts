// import { Webhook } from 'svix';
// import { headers } from 'next/headers';
// import { WebhookEvent } from '@clerk/nextjs/server';
// import { NextResponse } from 'next/server';
// import { dbConnect } from '@/lib/dbConnections/dbConnect';
// import { User } from '@/lib/models/Users';

// export async function POST(req: Request) {
//   const SIGNING_SECRET = process.env.SIGNING_SECRET;

//   if (!SIGNING_SECRET) {
//     console.error('Error: SIGNING_SECRET not found in environment variables');
//     throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local');
//   }

//   const wh = new Webhook(SIGNING_SECRET);

//   const headerPayload = await headers();
//   const svix_id = headerPayload.get('svix-id');
//   const svix_timestamp = headerPayload.get('svix-timestamp');
//   const svix_signature = headerPayload.get('svix-signature');

//   if (!svix_id || !svix_timestamp || !svix_signature) {
//     console.error('Error: Missing Svix headers');
//     return new NextResponse('Error: Missing Svix headers', {
//       status: 400,
//     });
//   }

//   const payload = await req.json();
//   const body = JSON.stringify(payload);

//   let evt: WebhookEvent;

//   try {
//     evt = wh.verify(body, {
//       'svix-id': svix_id,
//       'svix-timestamp': svix_timestamp,
//       'svix-signature': svix_signature,
//     }) as WebhookEvent;

//     console.log('✅ Webhook verified successfully');
//   } catch (err) {
//     console.error('Error: Could not verify webhook:', err);
//     return new NextResponse('Error: Verification error', {
//       status: 400,
//     });
//   }

//   const eventType = evt.type;
//   console.log('📬 Webhook Event Type:', eventType);

//   try {
//     await dbConnect();
//     console.log('Database connected');
//   } catch (error) {
//     console.error('Database connection failed:', error);
//     return new NextResponse('Error: Database connection failed', {
//       status: 500,
//     });
//   }

//   try {
//     switch (eventType) {
//       case 'user.created': {
//         const { id, email_addresses, first_name, last_name, image_url } = evt.data;

//         console.log('New user data:', {
//           id,
//           email: email_addresses?.[0]?.email_address,
//           firstName: first_name,
//           lastName: last_name,
//         });

//         const newUser = await User.create({
//           clerkId: id,
//           email: email_addresses[0].email_address,
//           firstName: first_name || '',
//           lastName: last_name || '',
//           photo: image_url || '',
//         });

//         console.log('User created in database:', newUser._id);

//         return NextResponse.json(
//           {
//             message: 'User created successfully',
//             userId: newUser._id,
//           },
//           { status: 201 }
//         );
//       }

//       case 'user.updated': {
//         const { id, email_addresses, first_name, last_name, image_url } = evt.data;

//         console.log('🔄 Updating user:', id);

//         const updatedUser = await User.findOneAndUpdate(
//           { clerkId: id },
//           {
//             email: email_addresses[0].email_address,
//             firstName: first_name || '',
//             lastName: last_name || '',
//             photo: image_url || '',
//           },
//           { new: true } // Return updated document
//         );

//         if (!updatedUser) {
//           console.error('User not found for update:', id);
//           return NextResponse.json(
//             { message: 'User not found' },
//             { status: 404 }
//           );
//         }

//         console.log('User updated in database:', updatedUser._id);

//         return NextResponse.json(
//           {
//             message: 'User updated successfully',
//             userId: updatedUser._id,
//           },
//           { status: 200 }
//         );
//       }

//       case 'user.deleted': {
//         const { id } = evt.data;

//         console.log('Deleting user:', id);

//         // Delete user from database
//         const deletedUser = await User.findOneAndDelete({ clerkId: id });

//         if (!deletedUser) {
//           console.error('User not found for deletion:', id);
//           return NextResponse.json(
//             { message: 'User not found' },
//             { status: 404 }
//           );
//         }

//         console.log('User deleted from database:', deletedUser._id);

//         return NextResponse.json(
//           {
//             message: 'User deleted successfully',
//             userId: deletedUser._id,
//           },
//           { status: 200 }
//         );
//       }

//       default:
//         console.log('ℹUnhandled event type:', eventType);
//         return NextResponse.json(
//           { message: 'Webhook received but not processed' },
//           { status: 200 }
//         );
//     }
//   } catch (error) {
//     console.error('Error processing webhook:', error);
//     return NextResponse.json(
//       {
//         message: 'Error processing webhook',
//         error: error instanceof Error ? error.message : 'Unknown error',
//       },
//       { status: 500 }
//     );
//   }
// }


import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnections/dbConnect";
import { User } from "@/lib/models/Users";

export async function POST(req: Request) {
  /* ================================
     1️⃣ VERIFY WEBHOOK (FIRST)
     ================================ */

  const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error("Missing CLERK_WEBHOOK_SECRET");
  }

  const wh = new Webhook(SIGNING_SECRET);

  const headerPayload = headers();
  const svix_id = (await headerPayload).get("svix-id");
  const svix_timestamp = (await headerPayload).get("svix-timestamp");
  const svix_signature = (await headerPayload).get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse("Missing Svix headers", { status: 400 });
  }

  const body = await req.text();

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new NextResponse("Invalid webhook signature", { status: 400 });
  }

  /* ================================
     2️⃣ EVENT TYPE
     ================================ */

  const eventType = evt.type;
  console.log("📬 Clerk Webhook:", eventType);

  /* ================================
     3️⃣ DATABASE
     ================================ */

  await dbConnect();

  /* ================================
     4️⃣ HANDLE EVENTS
     ================================ */

  switch (eventType) {
    case "user.created": {
      const { id, email_addresses, first_name, last_name, image_url } = evt.data;

      await User.create({
        clerkId: id,
        email: email_addresses[0].email_address,
        firstName: first_name || "",
        lastName: last_name || "",
        photo: image_url || "",
      });

      return NextResponse.json({ ok: true });
    }

    case "user.updated": {
      const { id, email_addresses, first_name, last_name, image_url } = evt.data;

      await User.findOneAndUpdate(
        { clerkId: id },
        {
          email: email_addresses[0].email_address,
          firstName: first_name || "",
          lastName: last_name || "",
          photo: image_url || "",
        }
      );

      return NextResponse.json({ ok: true });
    }

    case "user.deleted": {
      const { id } = evt.data;
      await User.findOneAndDelete({ clerkId: id });
      return NextResponse.json({ ok: true });
    }

    default:
      return NextResponse.json({ received: true });
  }
}
