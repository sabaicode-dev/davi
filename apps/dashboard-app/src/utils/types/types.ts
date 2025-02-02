// types/types.ts (or types/interfaces.ts)
export interface HistogramBucket {
    index: number;
    label: string;
    left_value: number;
    right_value: number;
    count: number;
  }
  
  export interface NumericMetrics {
    finite_count: number;
    mean: number;
    standard_deviation: number;
    minimum: number;
    maximum: number;
    quantiles: { point: number; value: number }[];
    histogram: {
      buckets: HistogramBucket[];
    };
  }
  