
export interface Message {
  id: string;
  sender: 'user' | 'chef';
  text: string;
  timestamp: Date;
}

export interface ChefState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}
