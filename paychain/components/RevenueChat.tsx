import React, { useState } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { ChartLine } from "lucide-react-native";

const screenWidth = Dimensions.get("window").width;

const RevenueChart = () => {
  const [range, setRange] = useState(7); // default: 7 days (Mon–Sun)

  // Generate random data for demo
  const generateData = (days: number) =>
    Array.from({ length: days }, () =>
      Math.floor(Math.random() * (1000 - 100 + 1) + 100)
    );

  const data = generateData(range);

  const chartData = {
    labels: range === 7 ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] : [],
    datasets: [{ data }],
  };

  return (
    <View className="p-4 bg-white rounded-xl shadow-md">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row items-center">
          <ChartLine color="#2563eb" size={20} />
          <Text className="ml-2 font-bold text-lg">Revenue Indicator</Text>
        </View>

        {/* Toggle buttons */}
        <View className="flex-row space-x-2">
          {[10, 20, 30].map((days) => (
            <TouchableOpacity
              key={days}
              onPress={() => setRange(days)}
              className={`px-3 py-1 rounded-lg ${
                range === days ? "bg-blue-500" : "bg-gray-200"
              }`}
            >
              <Text
                className={`${
                  range === days ? "text-white" : "text-gray-700"
                } font-semibold`}
              >
                {days}d
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Chart */}
      <LineChart
        data={chartData}
        width={screenWidth - 40}
        height={220}
        yAxisLabel="KSh "
        yAxisSuffix=""
        yAxisInterval={100} // step size
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#f6f6f6",
          backgroundGradientTo: "#f6f6f6",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(55, 65, 81, ${opacity})`,
          style: { borderRadius: 16 },
          propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: "#2563eb",
          },
        }}
        bezier
        style={{ marginVertical: 8, borderRadius: 16 }}
      />

      <Text className="mt-2 text-sm text-gray-500">
        Amount in KSh (100 – 1000)
      </Text>
    </View>
  );
};

export default RevenueChart;
/////////////////////////////////////////

