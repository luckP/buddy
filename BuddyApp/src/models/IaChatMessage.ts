type IaChatMessage = {
    role: "user" | "assistant";
    prompt: string;
    date?: Date;
    imageUrl: string;
  };
  


export default  IaChatMessage;