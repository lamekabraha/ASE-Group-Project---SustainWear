'use client'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface HistoryLineGraphClientProps {
    data: {
        count: number;
        date: string;
        [key: string]: any;
    }[];
}



export default function HistoryLineGraphClient({data}: HistoryLineGraphClientProps){
    return (
        <div className="border-3 border-green rounded-2xl p-5 gap-4 col-span-6">
          <h1 className="text-2xl font-semibold mb-4 text-center">Donation History</h1>
            <ResponsiveContainer minHeight={0} minWidth={0}>
                <LineChart
                    data={data}
                    margin={{top: 5, right: 20, left: 0, bottom: 5 }}
                    className="min-w-0 min-h-0"
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="date"/>
                    <YAxis width={30}/>
                    <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{r: 8}} name="Donations"/>
                    <Legend/>
                    <Tooltip/>

                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}