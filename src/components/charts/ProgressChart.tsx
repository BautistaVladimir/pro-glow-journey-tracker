
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { format } from 'date-fns';

// Common data structure for all charts
type ChartDataPoint = {
  date: string;
  value: number;
};

type ProgressChartProps = {
  data: ChartDataPoint[];
  dataKey?: string;
  color?: string;
  label: string;
  unit?: string;
  height?: number;
  showGrid?: boolean;
};

const ProgressChart = ({
  data,
  dataKey = 'value',
  color = '#9b87f5',
  label,
  unit = '',
  height = 300,
  showGrid = true,
}: ProgressChartProps) => {
  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return format(date, 'MMM d');
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label: tooltipLabel }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-md rounded border border-gray-100">
          <p className="text-sm text-gray-500">{formatDate(tooltipLabel)}</p>
          <p className="text-sm font-medium">{`${dataKey}: ${payload[0].value} ${unit}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <h4 className="text-sm font-medium mb-2">{label}</h4>
      <div style={{ width: '100%', height }}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate} 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `${value}${unit}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              dot={{ strokeWidth: 2, r: 4, fill: 'white' }}
              activeDot={{ r: 6, stroke: color, strokeWidth: 2, fill: 'white' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgressChart;
