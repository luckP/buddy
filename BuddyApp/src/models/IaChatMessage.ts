type IaChatMessage = {
    role: "user" | "assistant";
    prompt: string;
    date?: string;
  };
  


export default  IaChatMessage;