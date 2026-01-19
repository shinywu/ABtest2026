import React, { useState } from 'react';
import { 
  Bell, User, CheckCircle2, Sparkles, Filter, Settings,
  Download, RefreshCw, Share2, HelpCircle,
  BarChart2, FileText, LayoutDashboard, ArrowRight,
  MoreHorizontal, Plus
} from 'lucide-react';
import { SIDEBAR_ITEMS } from './constants';
import { ExperimentGroup, MetricColumn, SidebarItem, ReportSection, ThinkingStep } from './types';
import { getInitialReportState } from './recommendations';

// --- Helper Components ---

const Header = () => (
  <header className="h-12 bg-white border-b border-gray-200 flex items-center justify-between px-4 fixed w-full top-0 z-50 shadow-sm">
    <div className="flex items-center space-x-6">
      <div className="flex items-center space-x-2 font-bold text-lg text-blue-600">
        <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs">L</div>
        <span className="text-gray-900">Libra</span>
      </div>
      <nav className="flex items-center space-x-4 text-sm text-gray-600">
        <span className="text-gray-900 font-medium">A/B测试</span>
        <span className="hover:text-gray-900 cursor-pointer">实验列表</span>
        <span className="hover:text-gray-900 cursor-pointer">实验看板</span>
        <span className="hover:text-gray-900 cursor-pointer">实验发布</span>
        <span className="hover:text-gray-900 cursor-pointer">实验工具</span>
        <span className="hover:text-gray-900 cursor-pointer">实验指标</span>
        <span className="hover:text-gray-900 cursor-pointer">产品管理</span>
      </nav>
    </div>
    <div className="flex items-center space-x-4 text-gray-500">
      <div className="flex items-center space-x-1 text-sm border px-2 py-1 rounded bg-gray-50">
         <span>中国机房</span>
      </div>
      <CheckCircle2 size={18} className="text-green-500" />
      <HelpCircle size={18} />
      <Bell size={18} />
      <div className="w-6 h-6 bg-purple-600 rounded-full text-white flex items-center justify-center text-xs">A</div>
    </div>
  </header>
);

const ExperimentHeader = () => (
  <div className="sticky top-12 z-40 bg-white border-b border-gray-200 pt-4 pb-0 px-4 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center space-x-3">
        <h1 className="text-xl font-bold text-gray-900">【直播】彩排内倒计时弹窗出现时机</h1>
        <span className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-green-50 text-green-700 text-xs border border-green-200">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
          <span>运行中</span>
        </span>
        <div className="flex items-center space-x-4 text-sm text-gray-500 ml-2">
           <span className="flex items-center"><User size={14} className="mr-1"/> 22.7k</span>
           <span className="flex items-center"><User size={14} className="mr-1"/> 22.7k</span>
           <span className="text-yellow-400">★</span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500"><Sparkles size={16}/></button>
        <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500"><Download size={16}/></button>
        <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500"><RefreshCw size={16}/></button>
        <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500"><Settings size={16}/></button>
        <div className="h-4 w-px bg-gray-300 mx-2"></div>
        <button className="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50">查看验证实验</button>
        <button className="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 flex items-center"><span className="mr-1">⏸</span> 暂停</button>
        <button className="px-3 py-1.5 border border-red-200 text-red-600 rounded text-sm hover:bg-red-50 flex items-center"><span className="mr-1">⛔</span> 停止</button>
      </div>
    </div>
    <div className="flex space-x-6 text-sm">
      {['实验详情', '实验报告', '结论报告', '高级分析', '实验报警', '实验上线'].map((tab, idx) => (
        <div key={tab} className={`pb-3 cursor-pointer relative ${idx === 1 ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-gray-900'}`}>
          <div className="flex items-center">
            {tab}
            {tab === '结论报告' && <span className="ml-1 px-1 bg-blue-100 text-blue-600 text-[10px] rounded">AI</span>}
          </div>
          {idx === 1 && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></div>}
        </div>
      ))}
    </div>
  </div>
);

const Sidebar = ({ items }: { items: SidebarItem[] }) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    'core_focus': true,
    'business_core': false,
    'conversion': false
  });

  const toggle = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const renderItem = (item: SidebarItem, depth = 0) => {
    const isExpanded = expanded[item.id];
    return (
      <div key={item.id} className="select-none">
        <div 
          className={`flex items-center px-2 py-1.5 text-xs cursor-pointer rounded-md ${item.isActive ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
          onClick={() => item.children ? toggle(item.id) : null}
        >
          {item.children && (
            <span className="mr-1 text-gray-400 w-3 inline-block">
               {isExpanded ? '▼' : '▶'} 
            </span>
          )}
          {!item.children && <span className="mr-1 text-gray-400 w-3 inline-block">•</span>}
          {item.type === 'item' && !item.children && item.id.includes('core_metrics') && <FileText size={12} className="mr-1 text-blue-400"/>}
           {item.type === 'item' && !item.children && !item.id.includes('core_metrics') && <FileText size={12} className="mr-1 text-gray-400"/>}
          <span className="truncate">{item.label}</span>
        </div>
        {item.children && isExpanded && (
          <div>
            {item.children.map(child => renderItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  // Sticky offset = Global Header (48px) + Experiment Header (~100px)
  return (
    <div className="w-64 flex-shrink-0 bg-white border-r border-gray-200">
        <div className="sticky top-[148px] max-h-[calc(100vh-148px)] overflow-y-auto p-2 scrollbar-hide">
            <div className="flex items-center justify-between mb-2 px-2 pt-2">
                <span className="text-xs font-bold text-gray-500">指标导航</span>
                <div className="flex space-x-1">
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-400"><Plus size={14}/></button>
                    <button className="p-1 hover:bg-gray-100 rounded text-blue-500"><Sparkles size={14}/></button>
                </div>
            </div>
            {items.map(item => renderItem(item))}
        </div>
    </div>
  );
};

const SummaryCard = ({ data }: { data: any[], key?: string }) => (
  <div className="bg-white border border-blue-100 rounded-lg p-4 mb-4 shadow-sm relative overflow-hidden">
    <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-gray-700 text-sm flex items-center">
            <Sparkles size={14} className="text-blue-500 mr-2" />
            实验总结
        </h3>
        <div className="flex space-x-2">
            <button className="text-xs flex items-center border border-gray-200 px-2 py-1 rounded bg-white text-gray-600 hover:bg-gray-50">
                <Sparkles size={12} className="mr-1"/> 修改Prompt
            </button>
            <button className="text-gray-400 hover:text-gray-600"><RefreshCw size={14}/></button>
        </div>
    </div>
    
    <div className="text-sm text-gray-700 space-y-3 leading-relaxed">
      {data && data.map((item, index) => (
        <div key={index} className="flex items-start">
          <span className="text-blue-500 mr-2 mt-1.5 text-[6px]">•</span>
          <p>
             <span className="font-semibold text-gray-900">{item.title}：</span>
             {item.content.split(/([+-]?\d+\.\d+%)/).map((part, i) => {
                if (/^[+-]?\d+\.\d+%$/.test(part)) {
                    const isPositive = part.includes('+');
                    const className = isPositive 
                        ? "bg-green-100 text-green-700 px-1 rounded font-medium text-xs mx-1" 
                        : "bg-red-50 text-red-600 px-1 rounded font-medium text-xs mx-1";
                    return <span key={i} className={className}>{part}</span>;
                }
                return <span key={i}>{part}</span>;
             })}
           </p>
        </div>
      ))}
    </div>
  </div>
);

const MetricTable = ({ title, data, columns, level }: { title: string, data: ExperimentGroup[], columns: MetricColumn[], level: string, key?: string }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg mb-6 shadow-sm">
            <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center bg-gray-50 rounded-t-lg">
                <div className="flex items-center space-x-2">
                    <span className="px-1.5 py-0.5 bg-gray-200 text-gray-600 text-xs rounded border border-gray-300">{level}</span>
                    <h3 className="font-bold text-gray-800 text-sm">{title}</h3>
                    <div className="flex items-center space-x-2 ml-4 text-xs text-blue-600 cursor-pointer hover:underline">
                        <Sparkles size={12} />
                        <span>从头累计</span>
                    </div>
                     <div className="flex items-center space-x-1 text-xs text-blue-600 cursor-pointer hover:underline bg-blue-50 px-2 py-0.5 rounded">
                        <span>数据产出助手</span>
                    </div>
                </div>
                <div className="flex items-center space-x-3 text-xs text-gray-500">
                    <span className="flex items-center cursor-pointer hover:text-gray-700">数据口径 <span className="ml-1 text-blue-600 font-medium">CUPED ▼</span></span>
                    <span className="flex items-center cursor-pointer hover:text-gray-700">图表 <div className="w-8 h-4 bg-gray-200 rounded-full mx-1 relative"><div className="w-4 h-4 bg-white rounded-full border border-gray-300 shadow-sm absolute left-0"></div></div></span>
                    <MoreHorizontal size={14} className="cursor-pointer hover:text-gray-700"/>
                </div>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-right text-sm border-collapse">
                    <thead>
                        <tr className="border-b border-gray-100 bg-gray-50/50">
                            <th className="px-4 py-2 text-left font-medium text-gray-500 whitespace-nowrap text-[13px]">实验分组</th>
                            {columns.map(col => (
                                <th key={col.id} className="px-4 py-2 font-medium text-gray-500 min-w-[140px] text-[13px]">
                                    <div className="flex items-center justify-end space-x-1 cursor-pointer group">
                                        <BarChart2 size={12} className="text-blue-400 opacity-0 group-hover:opacity-100"/>
                                        <span>{col.label}</span>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((group, idx) => (
                            <tr key={group.id} className={`border-b border-gray-50 hover:bg-gray-50/80 ${idx === 0 ? 'bg-white' : 'bg-white'}`}>
                                <td className="px-4 py-3 text-left align-top whitespace-nowrap">
                                    <div className="font-medium text-gray-900 text-sm">{group.name}</div>
                                    {group.isControl && <span className="text-[10px] text-gray-400 bg-gray-100 px-1 rounded">对照组</span>}
                                    {!group.isControl && <span className="text-[10px] text-gray-400">无显著性检验</span>}
                                </td>
                                {columns.map(col => {
                                    const metric = group.metrics[col.id];
                                    if (!metric) return <td key={col.id}>-</td>;

                                    let bgClass = "";
                                    let textClass = "text-gray-900";

                                    if (!group.isControl) {
                                        if (metric.significance === 'positive') {
                                            bgClass = "bg-green-50/50";
                                            textClass = "text-green-600";
                                        } else if (metric.significance === 'negative') {
                                            bgClass = "bg-red-50/50";
                                            textClass = "text-red-600";
                                        }
                                    }

                                    return (
                                        <td key={col.id} className={`px-4 py-3 align-top ${bgClass}`}>
                                            {group.isControl ? (
                                                 <div className="text-gray-900 font-medium tracking-tight">{metric.value}</div>
                                            ) : (
                                                 <div className="flex flex-col items-end">
                                                    {/* Delta */}
                                                    <div className={`text-xs font-bold ${textClass}`}>
                                                        {metric.delta}
                                                    </div>
                                                    {/* Confidence Interval */}
                                                    <div className="text-[10px] text-gray-400 mt-0.5">
                                                        {metric.confidenceInterval || '-'}
                                                    </div>
                                                     {/* Value */}
                                                    <div className="text-gray-400 font-normal text-[10px] mt-0.5 tracking-tight">
                                                        {metric.value}
                                                    </div>
                                                 </div>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="w-full h-1 bg-gray-100/30"></div>
            <div className="text-center py-2 bg-white rounded-b-lg border-t border-gray-100">
                 <Plus size={14} className="mx-auto text-gray-300 cursor-pointer hover:text-gray-600"/>
            </div>
        </div>
    );
};

const ThinkingSidebar = ({ steps }: { steps: ThinkingStep[] }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-72 bg-gray-50 border-l border-gray-200 flex-shrink-0">
      <div className="sticky top-[148px] max-h-[calc(100vh-148px)] overflow-y-auto p-4 scrollbar-hide">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-800 text-sm">看数思路</h3>
          <button className="text-gray-400 hover:text-gray-600"><span className="text-lg">×</span></button>
        </div>

        <div className={`bg-indigo-50/50 border border-indigo-100/50 p-3.5 rounded-lg text-xs text-gray-500 mb-6 leading-relaxed shadow-sm transition-all duration-300 relative ${!isExpanded ? 'max-h-20 overflow-hidden' : ''}`}>
          <div className={!isExpanded ? 'line-clamp-2' : ''}>
             生服直播购物袋弹出后遮挡画面主体，影响用户观看与决策效率。实验组（v1）通过画面上移及取消蒙层优化体验，对照组（v0）保持原始样式。期望能够实验策略能提升GMV与订单量，改善购物袋转化效率。 
             {isExpanded && <span onClick={() => setIsExpanded(false)} className="text-indigo-500 cursor-pointer hover:underline ml-1 font-medium">收起</span>}
          </div>
          {!isExpanded && (
            <div className="absolute bottom-1 right-2 bg-gradient-to-l from-indigo-50 pl-4">
                <span onClick={() => setIsExpanded(true)} className="text-indigo-500 cursor-pointer hover:underline font-medium">... 展开</span>
            </div>
          )}
        </div>

        <div className="space-y-6 relative">
            {/* Vertical Line */}
            <div className="absolute left-2.5 top-2 bottom-0 w-px bg-gray-200 z-0"></div>

            {steps.map((step) => (
               <div key={step.id} className="relative z-10 pl-7">
                  <div className="absolute left-[5px] top-1 w-2 h-2 rounded-full bg-white border-2 border-blue-400"></div>
                  
                  <h4 className="text-xs font-bold text-gray-800 mb-2">{step.title}</h4>
                  <div className="space-y-2">
                      {step.items.map((item, i) => (
                          <div key={i} className="flex items-center space-x-2 bg-white border border-gray-200 px-2 py-2 rounded text-xs text-gray-600 hover:border-blue-300 cursor-pointer shadow-sm transition-colors">
                              {item.label.includes('指标') ? <BarChart2 size={12} className="text-gray-400 flex-shrink-0"/> : <Share2 size={12} className="text-gray-400 flex-shrink-0"/>}
                              <span className="truncate">{item.label}</span>
                          </div>
                      ))}
                  </div>
               </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const EditPromptArea = () => (
    <div className="mt-8 border border-gray-200 rounded-lg p-6 bg-white flex flex-col items-center justify-center text-center space-y-4 relative">
         <div className="absolute top-4 left-4 flex items-center text-gray-400 text-xs">
            <span className="mr-2">监控指标</span>
            <div className="w-3 h-3 text-gray-300"><Sparkles size={12}/></div>
         </div>
         <div className="absolute top-4 right-4">
            <button className="text-xs flex items-center border border-gray-200 px-2 py-1 rounded bg-white text-gray-600 hover:bg-gray-50">
                <Sparkles size={12} className="mr-1"/> 修改Prompt
            </button>
         </div>

         <div className="w-full max-w-lg border border-dashed border-red-200 bg-red-50/50 rounded-lg p-8 flex flex-col items-center justify-center">
             <span className="text-red-500 text-sm font-medium mb-2">做一些空态引导，这里仅展示占位</span>
             <p className="text-xs text-gray-500 mb-6">拖入文件，快速开始 Book 编辑吧~</p>
             <div className="flex space-x-3 w-full justify-center">
                  <div className="bg-white border border-gray-200 p-2.5 rounded w-28 text-left shadow-sm hover:shadow-md cursor-pointer transition-shadow">
                      <div className="flex items-center text-xs font-bold text-gray-700 mb-1"><span className="mr-1">🔗</span> 数据导入</div>
                      <p className="text-[10px] text-gray-400">第三方数据导入...</p>
                  </div>
                  <div className="bg-white border border-gray-200 p-2.5 rounded w-28 text-left shadow-sm hover:shadow-md cursor-pointer transition-shadow">
                      <div className="flex items-center text-xs font-bold text-gray-700 mb-1"><span className="mr-1">📂</span> MagiSDK</div>
                      <p className="text-[10px] text-gray-400">使用 SDK 链接...</p>
                  </div>
                   <div className="bg-white border border-gray-200 p-2.5 rounded w-28 text-left shadow-sm hover:shadow-md cursor-pointer transition-shadow">
                      <div className="flex items-center text-xs font-bold text-gray-700 mb-1"><span className="mr-1">🐍</span> Python</div>
                      <p className="text-[10px] text-gray-400">也许只想用Python...</p>
                  </div>
             </div>
         </div>
    </div>
)

const ChatInput = () => (
    <div className="sticky bottom-4 mx-6 mb-2 z-30">
         <div className="bg-white border border-blue-200 shadow-xl rounded-full px-4 py-3 flex items-center justify-between">
             <div className="flex items-center space-x-2 flex-1">
                 <Sparkles size={18} className="text-blue-500" />
                 <input 
                    type="text" 
                    placeholder="请告诉我你想分析什么，通过“@”选择指标/维度/看板"
                    className="w-full text-sm outline-none text-gray-700 placeholder-gray-400 ml-2"
                 />
             </div>
             <button className="bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-500 rounded-full p-2 transition-colors">
                 <ArrowRight size={16} />
             </button>
         </div>
         
         <div className="flex justify-center space-x-6 mt-3 text-[11px] text-gray-500 font-medium">
             <span className="flex items-center cursor-pointer hover:text-blue-600 transition-colors"><BarChart2 size={12} className="mr-1"/> 指标数据</span>
             <span className="flex items-center cursor-pointer hover:text-blue-600 transition-colors"><Share2 size={12} className="mr-1"/> 高级分析</span>
             <span className="flex items-center cursor-pointer hover:text-blue-600 transition-colors"><Sparkles size={12} className="mr-1"/> 智能分析</span>
             <span className="flex items-center cursor-pointer hover:text-blue-600 transition-colors"><FileText size={12} className="mr-1"/> 文本块</span>
             <span className="flex items-center cursor-pointer hover:text-blue-600 transition-colors"><LayoutDashboard size={12} className="mr-1"/> 分组</span>
         </div>
    </div>
)


// --- Main Application ---

const App = () => {
  const [reportState, setReportState] = useState(getInitialReportState());

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pt-12">
      <Header />
      <ExperimentHeader />
      
      <div className="flex flex-1 items-stretch p-4 gap-4 bg-gray-200">
        {/* Container B: Main Workspace Card */}
        <div className="flex flex-col flex-1 bg-white rounded-xl overflow-hidden">
            
            {/* Filter Bar (Moved to top of Container B) */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-white z-20 relative">
                <div className="flex items-center text-gray-600 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
                    <span className="mr-2 text-gray-400 text-xs">数据时间</span>
                    <span className="font-medium text-gray-900 mr-2 text-xs">2025-01-01</span>
                    <span className="mx-1 text-gray-300">-</span>
                    <span className="font-medium text-gray-900 mr-4 text-xs">2025-01-20</span>
                    <div className="w-px h-3 bg-gray-300 mx-2"></div>
                    <span className="text-blue-600 flex items-center cursor-pointer hover:text-blue-800 text-xs font-medium"><Filter size={12} className="mr-1"/> 数据条件 · 3</span>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="flex items-center bg-white border border-gray-300 rounded-full p-0.5 px-3 cursor-pointer shadow-sm">
                        <span className="text-xs text-blue-600 mr-2 font-medium">看数思路</span>
                        <div className="w-8 h-4 bg-blue-500 rounded-full relative transition-colors"><div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div></div>
                    </div>
                     <button className="flex items-center bg-blue-600 text-white text-xs px-3 py-1.5 rounded shadow-sm hover:bg-blue-700 transition-colors font-medium">
                        <Sparkles size={12} className="mr-1"/> AI 写报告
                     </button>
                </div>
            </div>

            {/* Container A: Sidebar + Center Content */}
            <div className="flex flex-1 items-stretch">
                <Sidebar items={SIDEBAR_ITEMS} />

                <div className="flex-1 min-w-0">
                  <div className="p-6 pb-24">
                    
                    {/* Dynamic Report Content */}
                    {reportState.sections.map((section) => {
                      if (section.type === 'summary') {
                        return <SummaryCard key={section.id} data={section.data} />;
                      }
                      if (section.type === 'metric_table') {
                        return (
                          <MetricTable
                            key={section.id}
                            title={section.title || ''}
                            level={section.level || ''}
                            data={section.data.rows}
                            columns={section.data.columns}
                          />
                        );
                      }
                      return null;
                    })}

                     <div className="flex items-center space-x-2 mb-4 text-sm text-gray-400 mt-8">
                         <span className="bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded text-xs border border-gray-300">一级</span>
                         <span className="font-medium">直播转化链路</span>
                    </div>
                    
                    {/* Simple Card for Analysis Task */}
                    <div className="bg-white border border-gray-200 rounded-lg p-3 flex justify-between items-center mb-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                         <div className="flex items-center space-x-2">
                             <span className="text-gray-400 text-xs">▼</span>
                             <span className="text-sm font-bold text-gray-800">高级分析任务123</span>
                         </div>
                         <div className="flex items-center space-x-3 text-xs text-gray-500">
                            <span className="flex items-center">数据口径 <span className="ml-1 text-blue-600 font-medium">CUPED ▼</span></span>
                            <span className="flex items-center">图表 <div className="w-8 h-4 bg-gray-200 rounded-full mx-1 relative"><div className="w-4 h-4 bg-white rounded-full border border-gray-300 shadow-sm absolute left-0"></div></div></span>
                            <MoreHorizontal size={14} className="cursor-pointer hover:text-gray-700"/>
                        </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-center justify-between text-xs text-blue-600 mb-8 cursor-pointer hover:bg-blue-100 transition-colors">
                         <div className="flex items-center">
                            <Sparkles size={14} className="mr-2"/>
                            请告诉我你想分析什么，通过“@”选择指标/维度/看板
                         </div>
                         <button className="bg-blue-200 hover:bg-blue-300 text-blue-700 rounded p-1"><div className="w-3 h-3 flex items-center justify-center">↑</div></button>
                    </div>
                    
                    <EditPromptArea />

                    <div className="mt-8 flex justify-center">
                         <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded shadow-sm text-sm hover:bg-gray-50 text-gray-600 transition-colors">
                            <Plus size={16} className="mr-2"/> 添加模块
                         </button>
                    </div>
                     <div className="mt-4 flex justify-center pb-8">
                         <button className="flex items-center px-4 py-1.5 bg-transparent border border-transparent rounded text-xs hover:bg-gray-100 text-gray-400 transition-colors">
                            返回传统模式 <span className="ml-1">→</span>
                         </button>
                    </div>

                  </div>

                  <ChatInput />
                </div>
            </div>
        </div>

        {/* Right Sidebar */}
        <ThinkingSidebar steps={reportState.thinkingSteps} />
      </div>
    </div>
  );
};

export default App;