import React from 'react';
import { ListItem as ListItemType } from '@/src/components/molecules/models/Save_Vi/types';

interface ListItemProps {
  item: ListItemType;
}

export const ListItem: React.FC<ListItemProps> = ({ item }) => {
  return (
    <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
        <svg
          className="w-5 h-5 text-purple-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      </div>
      <span className="text-gray-700">{item.title}</span>
    </div>
  );
}