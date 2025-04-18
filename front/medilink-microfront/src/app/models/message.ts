export interface Message {
  text: string;
  username: string;
  avatar: string;
  timestamp?: string; // Optional, included for database-fetched messages
}