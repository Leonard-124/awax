// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, Dimensions } from "react-native";
// import { LineChart } from "react-native-chart-kit";
// import { ChartLine } from "lucide-react-native";

// const screenWidth = Dimensions.get("window").width;

// const RevenueChart = () => {
//   const [range, setRange] = useState(7); // default: 7 days (Mon–Sun)

//   // Generate random data for demo
//   const generateData = (days: number) =>
//     Array.from({ length: days }, () =>
//       Math.floor(Math.random() * (1000 - 100 + 1) + 100)
//     );

//   const data = generateData(range);

//   const chartData = {
//     labels: range === 7 ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] : [],
//     datasets: [{ data }],
//   };

//   return (
//     <View className="p-4 bg-white rounded-xl shadow-md">
//       {/* Header */}
//       <View className="flex-row justify-between items-center mb-2">
//         <View className="flex-row items-center">
//           <ChartLine color="#2563eb" size={20} />
//           <Text className="ml-2 font-bold text-lg">Revenue Indicator</Text>
//         </View>

//         {/* Toggle buttons */}
//         <View className="flex-row space-x-2">
//           {[10, 20, 30].map((days) => (
//             <TouchableOpacity
//               key={days}
//               onPress={() => setRange(days)}
//               className={`px-3 py-1 rounded-lg ${
//                 range === days ? "bg-blue-500" : "bg-gray-200"
//               }`}
//             >
//               <Text
//                 className={`${
//                   range === days ? "text-white" : "text-gray-700"
//                 } font-semibold`}
//               >
//                 {days}d
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>

//       {/* Chart */}
//       <LineChart
//         data={chartData}
//         width={screenWidth - 40}
//         height={220}
//         yAxisLabel="KSh "
//         yAxisSuffix=""
//         yAxisInterval={100} // step size
//         chartConfig={{
//           backgroundColor: "#ffffff",
//           backgroundGradientFrom: "#f6f6f6",
//           backgroundGradientTo: "#f6f6f6",
//           decimalPlaces: 0,
//           color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
//           labelColor: (opacity = 1) => `rgba(55, 65, 81, ${opacity})`,
//           style: { borderRadius: 16 },
//           propsForDots: {
//             r: "4",
//             strokeWidth: "2",
//             stroke: "#2563eb",
//           },
//         }}
//         bezier
//         style={{ marginVertical: 8, borderRadius: 16 }}
//       />

//       <Text className="mt-2 text-sm text-gray-500">
//         Amount in KSh (100 – 1000)
//       </Text>
//     </View>
//   );
// };

// export default RevenueChart;
/////////////////////////////////////////////////////////2

// import React, { useEffect, useState } from 'react';
// import { View, Text, ActivityIndicator } from 'react-native';
// import Svg, { Rect, Text as SvgText, Line } from 'react-native-svg';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const BASE_URL = 'https://paychain-backend.onrender.com';

// type WeeklyData = {
//   day: string;
//   amount: number;
// };

// const FALLBACK: WeeklyData[] = [
//   { day: 'Mon', amount: 0 },
//   { day: 'Tue', amount: 0 },
//   { day: 'Wed', amount: 0 },
//   { day: 'Thu', amount: 0 },
//   { day: 'Fri', amount: 0 },
//   { day: 'Sat', amount: 0 },
//   { day: 'Sun', amount: 0 },
// ];

// const CHART_WIDTH = 320;
// const CHART_HEIGHT = 140;
// const BAR_GAP = 8;
// const BOTTOM_LABEL_HEIGHT = 20;
// const TOP_PADDING = 10;

// const RevenueChart = () => {
//   const [chartData, setChartData] = useState<WeeklyData[]>(FALLBACK);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetch7DayRevenue = async () => {
//       try {
//         const token = await AsyncStorage.getItem('accessToken');
//         if (!token) return;

//         const res = await fetch(`${BASE_URL}/api/revenue/weekly`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (res.ok) {
//           const data = await res.json();
//           if (Array.isArray(data) && data.length > 0) {
//             setChartData(data);
//           }
//         }
//       } catch {
//         // Use fallback data silently
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetch7DayRevenue();
//   }, []);

//   const maxAmount = Math.max(...chartData.map((d) => d.amount), 1);
//   const barCount = chartData.length;
//   const barWidth = (CHART_WIDTH - BAR_GAP * (barCount + 1)) / barCount;
//   const chartBodyHeight = CHART_HEIGHT - BOTTOM_LABEL_HEIGHT - TOP_PADDING;

//   return (
//     <View>
//       <View className="flex-row justify-between items-center mb-3">
//         <Text className="text-gray-900 font-bold text-base">Weekly Revenue</Text>
//         <Text className="text-gray-400 text-xs">Last 7 days</Text>
//       </View>

//       {loading ? (
//         <View
//           className="bg-gray-50 rounded-2xl items-center justify-center"
//           style={{ width: CHART_WIDTH, height: CHART_HEIGHT + 20 }}
//         >
//           <ActivityIndicator color="#059669" />
//         </View>
//       ) : (
//         <Svg
//           width={CHART_WIDTH}
//           height={CHART_HEIGHT + TOP_PADDING}
//           viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT + TOP_PADDING}`}
//         >
//           {/* Baseline */}
//           <Line
//             x1={0}
//             y1={CHART_HEIGHT - BOTTOM_LABEL_HEIGHT + TOP_PADDING}
//             x2={CHART_WIDTH}
//             y2={CHART_HEIGHT - BOTTOM_LABEL_HEIGHT + TOP_PADDING}
//             stroke="#e5e7eb"
//             strokeWidth={1}
//           />

//           {chartData.map((item, i) => {
//             const barHeight = Math.max(
//               4,
//               (item.amount / maxAmount) * chartBodyHeight
//             );
//             const x = BAR_GAP + i * (barWidth + BAR_GAP);
//             const y =
//               TOP_PADDING + chartBodyHeight - barHeight;

//             // Highlight today
//             const today = new Date().toLocaleDateString('en-US', {
//               weekday: 'short',
//             });
//             const isToday = item.day === today;

//             return (
//               <React.Fragment key={item.day}>
//                 <Rect
//                   x={x}
//                   y={y}
//                   width={barWidth}
//                   height={barHeight}
//                   rx={4}
//                   fill={isToday ? '#059669' : '#d1fae5'}
//                 />
//                 <SvgText
//                   x={x + barWidth / 2}
//                   y={CHART_HEIGHT + TOP_PADDING - 4}
//                   fontSize={10}
//                   fill={isToday ? '#059669' : '#9ca3af'}
//                   fontWeight={isToday ? '700' : '400'}
//                   textAnchor="middle"
//                 >
//                   {item.day}
//                 </SvgText>
//                 {item.amount > 0 && (
//                   <SvgText
//                     x={x + barWidth / 2}
//                     y={y - 4}
//                     fontSize={9}
//                     fill="#6b7280"
//                     textAnchor="middle"
//                   >
//                     {item.amount >= 1000
//                       ? `${(item.amount / 1000).toFixed(1)}k`
//                       : item.amount.toString()}
//                   </SvgText>
//                 )}
//               </React.Fragment>
//             );
//           })}
//         </Svg>
//       )}
//     </View>
//   );
// };

// export default RevenueChart;

//////////////////////////////////////////////////////////////3

import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import Svg, { Rect, Text as SvgText, Line } from 'react-native-svg';
import { authedFetch } from '../app/(Auth)/auth';

type WeeklyData = { day: string; amount: number };

const FALLBACK: WeeklyData[] = [
  { day: 'Mon', amount: 0 },
  { day: 'Tue', amount: 0 },
  { day: 'Wed', amount: 0 },
  { day: 'Thu', amount: 0 },
  { day: 'Fri', amount: 0 },
  { day: 'Sat', amount: 0 },
  { day: 'Sun', amount: 0 },
];

const CHART_WIDTH = 320;
const CHART_HEIGHT = 140;
const BAR_GAP = 8;
const BOTTOM_LABEL_HEIGHT = 20;
const TOP_PADDING = 10;

const RevenueChart = () => {
  const [chartData, setChartData] = useState<WeeklyData[]>(FALLBACK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch7DayRevenue = async () => {
      try {
        const res = await authedFetch('/api/revenue/weekly');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) setChartData(data);
        }
      } catch {
        // Use fallback silently
      } finally {
        setLoading(false);
      }
    };
    fetch7DayRevenue();
  }, []);

  const maxAmount = Math.max(...chartData.map((d) => d.amount), 1);
  const barCount = chartData.length;
  const barWidth = (CHART_WIDTH - BAR_GAP * (barCount + 1)) / barCount;
  const chartBodyHeight = CHART_HEIGHT - BOTTOM_LABEL_HEIGHT - TOP_PADDING;

  return (
    <View>
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-gray-900 font-bold text-base">Weekly Revenue</Text>
        <Text className="text-gray-400 text-xs">Last 7 days</Text>
      </View>

      {loading ? (
        <View
          className="bg-gray-50 rounded-2xl items-center justify-center"
          style={{ width: CHART_WIDTH, height: CHART_HEIGHT + 20 }}
        >
          <ActivityIndicator color="#059669" />
        </View>
      ) : (
        <Svg
          width={CHART_WIDTH}
          height={CHART_HEIGHT + TOP_PADDING}
          viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT + TOP_PADDING}`}
        >
          <Line
            x1={0} y1={CHART_HEIGHT - BOTTOM_LABEL_HEIGHT + TOP_PADDING}
            x2={CHART_WIDTH} y2={CHART_HEIGHT - BOTTOM_LABEL_HEIGHT + TOP_PADDING}
            stroke="#e5e7eb" strokeWidth={1}
          />
          {chartData.map((item, i) => {
            const barHeight = Math.max(4, (item.amount / maxAmount) * chartBodyHeight);
            const x = BAR_GAP + i * (barWidth + BAR_GAP);
            const y = TOP_PADDING + chartBodyHeight - barHeight;
            const today = new Date().toLocaleDateString('en-US', { weekday: 'short' });
            const isToday = item.day === today;

            return (
              <React.Fragment key={item.day}>
                <Rect x={x} y={y} width={barWidth} height={barHeight} rx={4}
                  fill={isToday ? '#059669' : '#d1fae5'} />
                <SvgText
                  x={x + barWidth / 2} y={CHART_HEIGHT + TOP_PADDING - 4}
                  fontSize={10} fill={isToday ? '#059669' : '#9ca3af'}
                  fontWeight={isToday ? '700' : '400'} textAnchor="middle"
                >
                  {item.day}
                </SvgText>
                {item.amount > 0 && (
                  <SvgText
                    x={x + barWidth / 2} y={y - 4}
                    fontSize={9} fill="#6b7280" textAnchor="middle"
                  >
                    {item.amount >= 1000
                      ? `${(item.amount / 1000).toFixed(1)}k`
                      : item.amount.toString()}
                  </SvgText>
                )}
              </React.Fragment>
            );
          })}
        </Svg>
      )}
    </View>
  );
};

export default RevenueChart;