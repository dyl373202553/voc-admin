import { getData, postData } from "@/lib/js/request";
import { ConfigModule } from '@/store/module/config';
let { dict } = ConfigModule

export const dictValue = (type: string) => {
    return getData(`${dict}`, {
        type
    });
}