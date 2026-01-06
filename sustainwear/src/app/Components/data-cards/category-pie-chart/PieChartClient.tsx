'use client'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface ChartData {
  name: string;
  value: number;
}

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#AF19FF',
  '#FF4560',
  '#775DD0',
  '#4CAF50',
  '#F9C80E',
  '#00B8D9' 
];

export default function PieChartClient({data}: {data:ChartData[]}) {
  return (
    <div className="border-2 border-green rounded-2xl p-5 gap-4 col-span-6">
      <h1 className="text-2xl font-semibold mb-4 text-center">Donations by Category</h1>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
        <Pie
            data={data as []}
            innerRadius='80%'
            outerRadius='100%'
            fill="#8884d8"
            paddingAngle={5}
            cornerRadius='50%'
            dataKey='value'
            nameKey='name'
            isAnimationActive={true}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}