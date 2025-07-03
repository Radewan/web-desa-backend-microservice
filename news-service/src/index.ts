import { web } from "./applications/web";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT ?? 3000;
web.listen(port, () => {
  console.log(`Listen at port ${port}`);
});
