// @ts-ignore
import PageTable from "@c/public/PageTable";
import { Vue, Component, Watch } from 'vue-property-decorator';

@Component({
    components: {
        PageTable
    }
})
export default class TablePage extends Vue {
    $deepCopy: any;
    private relust: object = {
        data: [],
        total: 0
    };
    private pageNum: number = 1;
    private pageSize: number = 10;
    private addParam: any = {};

    private tableContent: any = this.getTable()

    @Watch('pageNum')
    onpageNumChanged(val: number, oldVal: number) {
        if (this.$refs.pageTable) {
            (this.$refs.pageTable as any).$refs.pages.currentPage = val
        } else {
            // @ts-ignore
            this.pageNumChangeFn(val)
        }
    }

    private reTableData(): void {
        this.pageNum = 1;
        this.addParam = {}
    }

    private pageNumChange(num: number): void {
        this.pageNum = num;
        this.getTableData();
    }

    private selectCondition(data: object) {
        Object.assign(this.addParam, data)
        this.getTableData()
    }

    private pageTotalChange(num: number) {
        this.pageSize = num
        this.pageNum = 1
        this.getTableData();
    }

    private selectData(data: any) {
        for (let i in data) {
            data[i] = data[i].trim()
        }
        this.pageNum = 1
        Object.assign(this.addParam, data)
        this.getTableData()
    }

    private getTable() { }

    private async getTableData(): Promise<void> {
        let params = {
            pageNum: this.pageNum,
            pageSize: this.pageSize
        }

        Object.assign(params, this.addParam)
        // @ts-ignore
        this.relust = await this.getList(params)
    }

    private mounted(): void {
        this.getTableData();
    }
}