export interface ExperimentGroup {
  id: string;
  name: string;
  isControl: boolean;
  metrics: Record<string, MetricValue>;
}

export interface MetricValue {
  value: string;
  delta?: string; // e.g., "+6.23%"
  deltaType?: 'positive' | 'negative' | 'neutral';
  significance?: 'positive' | 'negative' | 'none';
  confidenceInterval?: string; // e.g., "±0.023%"
  subLabel?: string; // e.g., "No Signif"
}

export interface MetricColumn {
  id: string;
  label: string;
  subLabel?: string; // e.g., "(Total)"
}

export interface SidebarItem {
  id: string;
  label: string;
  type: 'folder' | 'item';
  children?: SidebarItem[];
  isActive?: boolean;
}

export interface ThinkingItem {
  label: string;
  type?: 'metric' | 'dimension';
  description?: string;
  children?: ThinkingItem[];
}

export interface ThinkingStep {
  id: string;
  title: string;
  description?: string;
  items: ThinkingItem[];
}

export type ReportSectionType = 'summary' | 'metric_table' | 'text_block';

export interface ReportSection {
  id: string;
  type: ReportSectionType;
  title?: string;
  level?: string; // e.g. "一级", "二级"
  data?: any; // Flexible data based on type
  config?: any; // Display configuration
}

export interface ReportState {
  sections: ReportSection[];
  thinkingSteps: ThinkingStep[];
}
