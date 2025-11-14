'use client'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface ChartData {
  name: string;
  value: number;
}

const COLORS = [
  '#0088FE', // Blue
  '#00C49F', // Teal
  '#FFBB28', // Amber
  '#FF8042', // Orange
  '#AF19FF', // Purple
  '#FF4560', // Red
  '#775DD0', // Indigo
  '#4CAF50', // Green
  '#F9C80E', // Yellow
  '#00B8D9'  // Cyan
];

export default function PieChartClient({data}: {data:ChartData[]}) {

  if (!data || data.length === 0) {
    return (
      <div className="col-span-12 lg:col-span-5 bg-white p-6 rounded-lg shadow-md flex items-center justify-center h-full">
        <p className="text-gray-500">No donation data to display.</p>
      </div>
    );
  }

  return (
    <div className="border-2 border-green rounded-2xl p-5 gap-4 col-span-6">
      <h3 className="text-2xl font-semibold mb-4 text-center">Donations by Category</h3>
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