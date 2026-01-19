import { ExperimentGroup, MetricColumn, SidebarItem, ThinkingStep } from './types';
import { LayoutDashboard, FileText, ShoppingCart, Video, BarChart2 } from 'lucide-react';

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    id: 'core_focus',
    label: '实验核心关注',
    type: 'folder',
    children: [
      { id: 'core_metrics', label: '核心指标3 (全局)', type: 'item', isActive: true },
      { id: 'retention', label: '按进组时间拆分留存(全局)', type: 'item' },
    ]
  },
  {
    id: 'business_core',
    label: '业务核心指标',
    type: 'folder',
    children: [
      { id: 'live_stream', label: '业务核心指标-直播', type: 'item' },
      { id: 'base_metrics', label: '业务基础指标(推荐)', type: 'item' },
      { id: 'shopping_cart', label: 'shopping_cart vvshopping', type: 'item' },
    ]
  },
  {
    id: 'conversion',
    label: '直播转化链路',
    type: 'folder',
    children: [
      { id: 'high_analysis', label: '高级分析任务123', type: 'item' },
      { id: 'cart_vv', label: 'shopping_cart vv', type: 'item' },
    ]
  },
  {
    id: 'others',
    label: '其他监控指标',
    type: 'folder',
    children: []
  }
];

export const LIVE_METRICS_COLUMNS: MetricColumn[] = [
  { id: 'user', label: 'User', subLabel: '' },
  { id: 'avg_7_days', label: '近7天人均投稿数', subLabel: '' },
  { id: 'avg_7_days_view', label: '近7天人均观看时长', subLabel: '' },
];

export const LIVE_METRICS_DATA: ExperimentGroup[] = [
  {
    id: 'v0',
    name: 'V0 对照组',
    isControl: true,
    metrics: {
      user: { value: '7,945,398,876.95' },
      avg_7_days: { value: '7,945,398,876.95' },
      avg_7_days_view: { value: '7,945,398,876.95' },
    }
  },
  {
    id: 'v1',
    name: '实验组V1',
    isControl: false,
    metrics: {
      user: { value: '7,945,398,876.95', delta: '+6.23%', deltaType: 'positive', significance: 'positive', subLabel: '无显著性检验' },
      avg_7_days: { value: '7,945,398,876.95', delta: '-6.23%', deltaType: 'negative', significance: 'negative', confidenceInterval: '±0.023%' },
      avg_7_days_view: { value: '7,945,398,876.95', delta: '+6.27%', deltaType: 'positive', significance: 'positive', confidenceInterval: '±0.023%' },
    }
  },
  {
    id: 'v2',
    name: '实验组V2',
    isControl: false,
    metrics: {
      user: { value: '7,945,398,876.95', delta: '+6.23%', deltaType: 'positive', significance: 'positive', subLabel: '无显著性检验' },
      avg_7_days: { value: '7,945,398,876.95', delta: '-6.23%', deltaType: 'negative', significance: 'negative', confidenceInterval: '±0.023%' },
      avg_7_days_view: { value: '7,945,398,876.95', delta: '+6.27%', deltaType: 'positive', significance: 'positive', confidenceInterval: '±0.023%' },
    }
  },
  {
    id: 'v3',
    name: '实验组V3',
    isControl: false,
    metrics: {
      user: { value: '7,945,398,876.95', delta: '+0.23%', deltaType: 'positive', significance: 'none', subLabel: '无显著性检验' },
      avg_7_days: { value: '7,945,398,876.95', delta: '+0.23%', deltaType: 'positive', significance: 'none', confidenceInterval: '±0.023%' },
      avg_7_days_view: { value: '7,945,398,876.95', delta: '+0.23%', deltaType: 'positive', significance: 'none', confidenceInterval: '±0.023%' },
    }
  }
];

