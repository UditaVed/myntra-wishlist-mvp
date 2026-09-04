import React from 'react';
import { Search } from 'lucide-react';

export const SidebarFilters = () => {
  return (
    <aside className="w-60 flex-shrink-0 pr-6 border-r border-gray-200 hidden md:block select-none text-[#282c3f]">
      
      {/* Brand Filter Section */}
      <div className="pb-4 border-b border-gray-200 space-y-2.5">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-xs uppercase tracking-wider text-[#282c3f]">
            BRAND
          </h4>
          <Search className="w-3.5 h-3.5 text-gray-400 cursor-pointer hover:text-gray-600" />
        </div>

        <div className="space-y-2 text-xs">
          {[
            { name: 'HIGHLANDER', count: '7934' },
            { name: 'Crimsoune Club', count: '6936' },
            { name: 'Roadster', count: '5608' },
            { name: 'CAHOOT', count: '4623' },
            { name: 'Mast & Harbour', count: '4473' },
            { name: 'HERE&NOW', count: '3842' },
            { name: 'Allen Solly', count: '3272' },
            { name: 'SHOWOFFFF', count: '3191' },
          ].map((b, idx) => (
            <label key={b.name} className="flex items-center gap-2 cursor-pointer text-[#282c3f] hover:text-[#ff3f6c]">
              <input type="checkbox" defaultChecked={idx < 2} className="accent-[#ff3f6c] w-3.5 h-3.5 rounded-sm cursor-pointer" />
              <span className="font-bold">{b.name}</span>
              <span className="text-[10px] text-gray-400 font-normal">({b.count})</span>
            </label>
          ))}
          <div className="text-xs font-bold text-[#ff3f6c] cursor-pointer hover:underline pt-1">
            + 1716 more
          </div>
        </div>
      </div>

      {/* Price Filter Section */}
      <div className="py-4 border-b border-gray-200 space-y-3">
        <h4 className="font-bold text-xs uppercase tracking-wider text-[#282c3f]">
          PRICE
        </h4>
        <div className="space-y-2 text-xs">
          <div className="h-1 bg-gray-200 rounded relative">
            <div className="absolute left-0 right-1/4 h-full bg-[#ff3f6c] rounded" />
          </div>
          <div className="flex justify-between text-xs font-bold text-[#282c3f]">
            <span>Rs. 100</span>
            <span>Rs. 10,100+</span>
          </div>
        </div>
      </div>

      {/* Color Filter Section */}
      <div className="py-4 space-y-2.5">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-xs uppercase tracking-wider text-[#282c3f]">
            COLOR
          </h4>
          <Search className="w-3.5 h-3.5 text-gray-400 cursor-pointer hover:text-gray-600" />
        </div>
        <div className="space-y-2 text-xs">
          {[
            { name: 'Blue', color: 'bg-blue-600', count: '33131' },
            { name: 'White', color: 'bg-white border border-gray-300', count: '29091' },
            { name: 'Black', color: 'bg-black', count: '21795' },
            { name: 'Green', color: 'bg-emerald-600', count: '20491' },
            { name: 'Grey', color: 'bg-gray-400', count: '15121' },
            { name: 'Navy Blue', color: 'bg-navy-900 bg-blue-950', count: '13535' },
          ].map(c => (
            <label key={c.name} className="flex items-center gap-2 cursor-pointer text-[#282c3f] hover:text-[#ff3f6c]">
              <span className={`w-3.5 h-3.5 rounded-full ${c.color} inline-block`} />
              <span className="font-medium">{c.name}</span>
              <span className="text-[10px] text-gray-400 font-normal">({c.count})</span>
            </label>
          ))}
        </div>
      </div>

    </aside>
  );
};
