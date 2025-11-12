'use client'
import {Line, LineChart} from 'recharts';

export default function step1(){
    const data = [
        { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
        { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
        { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
        { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
        { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
        { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
        { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
      ];
    return (
        <div className="border-2 border-green rounded-2xl p-5 flex gap-4 col-span-5">
            <LineChart style={{ width: '100%', aspectRatio: 1.618, maxWidth: 600 }} responsive data={data}>
                <Line dataKey="uv" />
            </LineChart>
        </div>
    )
}