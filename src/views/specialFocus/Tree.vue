<template>
    <div class="app-container">
        <el-card class="box-card fl" style="width:48%">
            <el-scrollbar class="tree_div_tree">
                <!-- default-checked-keys 默认勾选的节点的 key 的数组 -->
                <el-tree  highlight-current show-checkbox :props="defaultProps" ref="treePerson" node-key="id" :default-checked-keys="selIdArr"
                    lazy :load="loadAll">
                    <!-- @check-change="handleChangeClick" @node-click="handleNodeClick1"
                    @node-expand="handleExpandClick" -->
                </el-tree>
            </el-scrollbar>
        </el-card>
        <el-card class="box-card fr" style="width:48%">
            <el-scrollbar class="tree_div_tree">
                <el-tree  highlight-current show-checkbox :props="defaultProps" ref="treeDepartment" node-key="id" :default-checked-keys="departmentArr"
                    lazy :load="loadAllDepartment" @current-change="handleChangeClick">
                    <!--
                    @node-expand="handleExpandClick" -->
                </el-tree>
            </el-scrollbar>
        </el-card>
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

    private selIdArr= [] // 选中id的数组 默认勾选的节点的 key 的数组
    private selInfoArr= [] // 选中id的数组

    private departmentArr= []

    // 部门获取
    private loadAllDepartment(node: any, resolve: (arg0: {}[]) => any) {
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
                        obj.disabled = false // 是否可以选择
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
                node.data.disabled = false
                node.loading = false
                node.isLeaf = true
            } else {
                const params = {
                    orgCode: node.data.id
                }
                getOrgTree(params).then(res => {
                    const childList = res.data.childList
                    const arr = []
                    for (let i = 0; i < childList.length; i++) {
                        const obj: any = {}
                        obj.isLeaf = false
                        obj.disabled = false
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
                    const childList = res.data.childList
                    const arr = []
                    for (let i = 0; i < childList.length; i++) {
                        const obj: any = {}
                        obj.isLeaf = false
                        obj.disabled = false
                        obj.id = childList[i].orgCode
                        obj.label = childList[i].orgName
                        obj.extendProperty = childList[i].extendProperty
                        obj.level = childList[i].level
                        arr.push(obj)
                    }
                    return resolve(arr)
                })
            } else {
                node.data.disabled = false
                node.loading = false
                node.isLeaf = true
            }
        } else if (node.level === 3) {
            node.data.disabled = false
            node.loading = false
            node.isLeaf = true
        }
    }

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

    private handleChangeClick(data: any, dataAll: any) {
        console.log(data)
        console.log(dataAll)
        // if (data.isLeaf === false) {} else {
        //     if (isCheck) {
        //         // @ts-ignore
        //         this.$refs.treePerson.setChecked(data.id, true)
        //         // @ts-ignore
        //         if ((this.selIdArr.indexOf(data.id) === -1)) {
        //             // @ts-ignore
        //             this.selInfoArr.push(data.res)
        //             // @ts-ignore
        //             this.selIdArr.push(data.id)
        //         }
        //     } else {
        //         // @ts-ignore
        //         this.$refs.treePerson.setChecked(data.id, false)
        //         // @ts-ignore
        //         if (this.selIdArr.indexOf(data.id) > -1) {
        //             // @ts-ignore
        //             this.removeAaary(this.selIdArr, data.id)
        //             for (let i = 0; i < this.selInfoArr.length; i++) {
        //                 // @ts-ignore
        //                 if (this.selInfoArr[i].userCode === data.id) {
        //                     this.removeAaary(this.selInfoArr, this.selInfoArr[i])
        //                 }
        //             }
        //         }
        //     }
        // }
    }

    // private handleExpandClick(data: { disabled: boolean }, node: any, self: any) {
    //     console.log(node)
    //     console.log(self)
    //     if (data.disabled) {
    //         data.disabled = false
    //     }
    // }

    // private removeAaary(_arr: any[], _obj: never) { // 删除数组中指定元素
    //     const length = _arr.length
    //     for (let i = 0; i < length; i++) {
    //         if (_arr[i] === _obj) {
    //             if (i === 0) {
    //                 _arr.shift() // 删除并返回数组的第一个元素
    //                 return _arr
    //             } else if (i === length - 1) {
    //                 _arr.pop() // 删除并返回数组的最后一个元素
    //                 return _arr
    //             } else {
    //                 _arr.splice(i, 1) // 删除下标为i的元素
    //                 return _arr
    //             }
    //         }
    //     }
    // }
}
</script>

<style scoped>
</style>
