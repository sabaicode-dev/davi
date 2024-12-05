export interface ListItem {
    id: string;
    title: string;
  }
  
  export interface SaveVisualizeCardProps {
    onSave: () => void;
    onSaveNew: () => void;
    onClose: () => void;
    items: ListItem[];
  }