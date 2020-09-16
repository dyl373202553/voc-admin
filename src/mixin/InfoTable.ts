import { Vue, Component, Watch } from 'vue-property-decorator';
@Component
export default class InfoTable extends Vue {
    private tableData: any = []
    private columns = [
        {
            title: "",
            key: "line1",
            align: "center",
            width: "130px",
            className: "table_title"
        },
        {
            title: " ",
            key: "line2",
            className: "linebai",
        },
        {
            title: " ",
            key: "line3",
            align: "center",
            width: "130px",
            className: "table_title"
        },
        {
            title: " ",
            key: "line4",
            className: "linebai",
        }
    ]
    private rowClassName(row: any, index: number) {
        if (index % 2 === 0) {
            return "tableRow";
        }
    }
}