<template>
    <div class="app-container">
        <el-row :gutter="20">
            <el-col :span="12">
                <div class="treePerson">
                    <el-tree  highlight-current show-checkbox :props="defaultProps" ref="tree1" node-key="id" :default-checked-keys="selIdArr"
                        lazy :load="loadAll"  @check-change="handleChangeClick" @node-click="handleNodeClick"
                        @node-expand="handleExpandClick">
                    </el-tree>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="selected">
                    <div class="flex acenter between">
                        <div>已选择联系人</div>
                    </div>
                    <div class="selecteContain">
                        <div v-for="pr in selInfoArr" class="nameShow" :key="pr.userCode">
                            {{pr.userName}}
                            <el-button icon="el-icon-delete" class="dbtn-del" @click="delPerson(pr.userCode)"/>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
        <div class="ReleaseBox">
            <el-button size="small" type="danger" @click="clearAll" round>清空</el-button>
            <el-button size="small" type="primary" @click="sureSelect()" round>确定</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { getOrgFirst, getUserListBySecondCode, getOrgTree } from "@/api/addressBook"
@Component
export default class SpecialFocus extends Vue {
    private defaultProps={
        children: "children",
        label: "label",
        isLeaf: "isLeaf"
    }

    private selIdArr: any= [] // 选中id的数组 默认勾选的节点的 key 的数组
    private selInfoArr: any= [] // 选中id的数组

    private departmentArr: any= []

    // 通讯录获取
    private loadAll(node: any, resolve: (arg0: {}[]) => any) {
        if (node.level === 0) {
            const params = {
                moaFlag: "1"
            }
            getOrgFirst(params).then(res => {
                if (res.code === 0) {
                    const leaderList = res.data.childOrgList
                    const brr = [] // 组装部门数据
                    for (let i = 0; i < leaderList.length; i++) {
                        const obj: any = {}
                        obj.isLeaf = false // 是否有下级
                        obj.disabled = true // 是否可以选择
                        obj.id = leaderList[i].orgCode
                        obj.label = leaderList[i].orgName
                        obj.level = leaderList[i].level
                        brr.push(obj)
                    }
                    return resolve(brr)
                }
            })
        } else if (node.level === 1) {
            if (node.data.level === 1) {
                const params = {
                    orgCode: node.data.id
                }
                getUserListBySecondCode(params).then(res => {
                    if (res.code === 0) {
                        const userList = res.data
                        const arr = []
                        for (let i = 0; i < userList.length; i++) {
                            const obj: any = {}
                            obj.isLeaf = true
                            obj.id = userList[i].userCode
                            obj.label = userList[i].userName
                            obj.res = userList[i]
                            arr.push(obj)
                        }
                        return resolve(arr)
                    }
                })
            } else {
                const params = {
                    orgCode: node.data.id
                }
                getOrgTree(params).then(res => {
                    const leaderList = res.data.leaderList
                    const childList = res.data.childList
                    const arr = []
                    for (let i = 0; i < leaderList.length; i++) {
                        const obj: any = {}
                        obj.isLeaf = true
                        obj.id = leaderList[i].userCode
                        obj.label = leaderList[i].userName
                        obj.res = leaderList[i]
                        // obj.icon = LOGIN_URL + leaderList[i].imgB
                        arr.push(obj)
                    }
                    for (let i = 0; i < childList.length; i++) {
                        const obj: any = {}
                        obj.isLeaf = false
                        obj.disabled = true
                        obj.id = childList[i].orgCode
                        obj.label = childList[i].orgName
                        obj.extendProperty = childList[i].extendProperty
                        obj.level = childList[i].level
                        arr.push(obj)
                    }
                    return resolve(arr)
                })
            }
        } else if (node.level === 2) {
            if (node.data.extendProperty.hasChildOrg === 1) {
                const params = {
                    orgCode: node.data.id
                }
                getOrgTree(params).then(res => {
                    const leaderList = res.data.leaderList
                    const childList = res.data.childList
                    const arr = []
                    for (let i = 0; i < leaderList.length; i++) {
                        const obj: any = {}
                        obj.isLeaf = true
                        obj.id = leaderList[i].userCode
                        obj.label = leaderList[i].userName
                        obj.res = leaderList[i]
                        // obj.icon = LOGIN_URL + leaderList[i].imgB
                        arr.push(obj)
                    }
                    for (let i = 0; i < childList.length; i++) {
                        const obj: any = {}
                        obj.isLeaf = false
                        obj.disabled = true
                        obj.id = childList[i].orgCode
                        obj.label = childList[i].orgName
                        obj.extendProperty = childList[i].extendProperty
                        obj.level = childList[i].level
                        arr.push(obj)
                    }
                    return resolve(arr)
                })
            } else {
                const params = {
                    orgCode: node.data.id
                }
                getUserListBySecondCode(params).then((res) => {
                    if (res.code === 0) {
                        const userList = res.data
                        const arr = []
                        for (let i = 0; i < userList.length; i++) {
                            const obj: any = {}
                            obj.isLeaf = true
                            obj.id = userList[i].userCode
                            obj.label = userList[i].userName
                            obj.res = userList[i]
                            arr.push(obj)
                        }
                        return resolve(arr)
                    }
                })
            }
        } else if (node.level === 3) {
            const params = {
                orgCode: node.data.id
            }
            getUserListBySecondCode(params).then(res => {
                if (res.code === 0) {
                    const userList = res.data
                    const arr = []
                    for (let i = 0; i < userList.length; i++) {
                        const obj: any = {}
                        obj.isLeaf = true
                        obj.id = userList[i].userCode
                        obj.label = userList[i].userName
                        obj.res = userList[i]
                        arr.push(obj)
                    }
                    return resolve(arr)
                }
            })
        }
    }

    private handleNodeClick(data: { isLeaf: any; isCheck: boolean; disabled: boolean }) {
        if (data.isLeaf) {
            if (data.isCheck) {
                // @ts-ignore
                this.$refs.tree1.setChecked(data, false)
                data.isCheck = false
            } else {
                // @ts-ignore
                this.$refs.tree1.setChecked(data, true)
                data.isCheck = true
            }
        } else {
            if (data.disabled) {
                data.disabled = false
            }
        }
    }

    private handleExpandClick(data: { disabled: boolean }, node: any, self: any) {
        console.log(self)
        if (data.disabled) {
            data.disabled = false
        }
    }

    private handleChangeClick(data: any, isCheck: any) {
        if (data.isLeaf === false) {} else {
            if (isCheck) {
                // @ts-ignore
                this.$refs.tree1.setChecked(data.id, true)
                if ((this.selIdArr.indexOf(data.id) === -1)) {
                    this.selInfoArr.push(data.res)
                    this.selIdArr.push(data.id)
                    console.log(this.selInfoArr)
                }
            } else {
                // @ts-ignore
                this.$refs.tree1.setChecked(data.id, false)
                if (this.selIdArr.indexOf(data.id) > -1) {
                    this.removeAaary(this.selIdArr, data.id)
                    for (let i = 0; i < this.selInfoArr.length; i++) {
                        if (this.selInfoArr[i].userCode === data.id) {
                            this.removeAaary(this.selInfoArr, this.selInfoArr[i])
                        }
                    }
                }
            }
        }
    }

    private clearAll() {
        this.selIdArr = []
        this.selInfoArr = []
        // @ts-ignore
        this.$refs.tree1.setCheckedKeys(this.selIdArr)
    }

    private delPerson(id: any) {
        this.removeAaary(this.selIdArr, id)
        for (let i = 0; i < this.selInfoArr.length; i++) {
            if (this.selInfoArr[i].userCode === id) {
                this.removeAaary(this.selInfoArr, this.selInfoArr[i])
            }
        }
        // @ts-ignore
        this.$refs.tree1.setChecked(id, false)
    }

    private removeAaary(_arr: any[], _obj: any) { // 删除数组中指定元素
        const length = _arr.length
        for (let i = 0; i < length; i++) {
            if (_arr[i] === _obj) {
                if (i === 0) {
                    _arr.shift() // 删除并返回数组的第一个元素
                    return _arr
                } else if (i === length - 1) {
                    _arr.pop() // 删除并返回数组的最后一个元素
                    return _arr
                } else {
                    _arr.splice(i, 1) // 删除下标为i的元素
                    return _arr
                }
            }
        }
    }

    private sureSelect() {
        this.$emit("func", this.selInfoArr)
    }
}
</script>

<style scoped>
    .treePerson {
        height: 400px;
        overflow-y: auto;
        overflow-x: hidden;
    }
    .ReleaseBox {
        position: absolute;
        right: 20px;
    }
    .ReleaseBox .el-button {
        padding: 10px 30px;
    }
    .dbtn-del {
        border: none;
    }
    .dbtn-del:hover {
        background: transparent;
    }
</style>
