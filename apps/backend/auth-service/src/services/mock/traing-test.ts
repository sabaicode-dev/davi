// mockData.ts
export const getMockTrackingInfo = () => {
  return {
    DeviceId: "Device-1",
    PositionHistory: [
      {
        Position: [-123.4567, 45.6789], // Longitude, Latitude
        SampleTime: "2024-12-01T10:00:00Z",
      },
      {
        Position: [-123.456, 45.679],
        SampleTime: "2024-12-01T10:05:00Z",
      },
      {
        Position: [-123.455, 45.68],
        SampleTime: "2024-12-01T10:10:00Z",
      },
      {
        Position: [-123.453, 45.682],
        SampleTime: "2024-12-01T10:15:00Z",
      },
    ],
  };
};
