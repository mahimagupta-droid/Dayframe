import { Icon } from "next/dist/lib/metadata/types/metadata-types"
import { Card, CardContent } from "./ui/card";
type StatsCardTypes = {
    title: string,
    value: number,
    icon: Icon,
    color: string,
     change?: string;
  changeType?: 'positive' | 'negative';
  gradient: string;
}

export default function StatsCard({ title, value,  icon, color, change, changeType, gradient }: StatsCardTypes) {
     return (
    <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:border-gray-700 transition-all overflow-hidden relative group">
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br ${gradient}`} />
      <CardContent className="p-6 relative">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm text-gray-400 mb-2">{title}</p>
            <p className="text-4xl font-bold text-white mb-2">{value}</p>
            {change && (
              <div className="flex items-center gap-2">
                <div className={`h-1.5 w-1.5 rounded-full ${
                  changeType === 'positive' ? 'bg-green-400' : 'bg-red-400'
                } animate-pulse`} />
                <p className={`text-xs font-medium ${
                  changeType === 'positive' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {change}
                </p>
              </div>
            )}
          </div>
          <div className={`p-4 rounded-2xl bg-gradient-to-br ${gradient} shadow-lg`}>
            <Icon className="h-7 w-7 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}