<template>
    <div class="container-fluid">
        <div id="search" class="title">
            <input type="text" id="bbbb" value="" placeholder="请输入搜索内容" v-model="words" />
            <select class="mr20" id="regTimeDirection" v-model="mcId">
                <option value="{{item.mcId}}" v-for="item of musicClassDTOs">{{item.name}}</option>
            </select>
            <div class="myBtn" @click="seach()">搜索</div>
        </div>
        <table class="table table-bordered table-striped with-check" id="DataTables_Table_0">
            <thead>
                <tr>
                    <th>
                        <div class="checkbox">
                            <input type="checkbox" id="title-table-td" class="checkboxInp" name="title-table-checkbox" :checked="checkState" @click="changeFn">
                            <label for="title-table-td" class="checkboxLabel"></label>
                        </div>
                    </th>
                    <th>序号</th>
                    <th>音乐名称</th>
                    <th>历史播放</th>
                    <th>7日播放</th>
                    <th>历史分享</th>
                    <th>类别</th>
                    <th>文件</th>
                    <th>状态</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item of list">
                    <td>
                        <div class="checkbox">
                            <input type="checkbox" id="title-table-td{{item.msId}}" class="checkboxInp" name="title-table-checkbox" :checked="checkState" data-typeid="{{ item.msId }}">
                            <label for="title-table-td{{item.msId}}" class="checkboxLabel"></label>
                        </div>
                    </td>
                    <td>{{$index+1+(page-1)*10}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.historyPlayCount}}</td>
                    <td>{{item.weekPlayCount}}</td>
                    <td>{{item.historyShareCount}}</td>
                    <td>{{item.musicClassName}}</td>
                    <td>{{item.filePath}}</td>
                    <td>{{item.isEnable | isEnableFilter}}</td>
                </tr>
            </tbody>
        </table>
        <div class='bottom' style="display:fix">
            <div id="test">
                <zpagenav :page="page" , :page-size="pageSize" , :total="total" , :max-link="maxLink" :page-handler="pageHandler" :create-url="createUrl">
                    <zpagenav>
            </div>
            <p>
                <a class="btn btn-success" href="#" @click="btnStart()">启用</a>
                <a class="btn btn-danger" href="#" @click="btnDisable()">禁用</a>
                <a class="btn btn-info" href="#" @click="btnDelete()">删除</a>
                <a class="btn btn-warning" id="addVip" @click="addFn()">新增</a>
            </p>
        </div>
    </div>
    <div class="modal-backdrop in" v-if="disable"></div>
    <div id="forbid" class="modal" v-if="disable">
        <div class="modal-header">
            <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
            <h3>禁用</h3>
        </div>
        <div class="modal-body">
            <p>{{ containTitle }}</p>
        </div>
        <div class="modal-footer"> <a data-dismiss="modal" class="btn " href="#" @click="close()">取消</a> <a data-dismiss="modal" class="btn btn-danger" href="#" @click="configDisable()">确定</a> </div>
    </div>
    <div class="modal-backdrop in" v-if="start"></div>
    <div id="start" class="modal" v-if="start">
        <div class="modal-header">
            <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
            <h3>启用</h3>
        </div>
        <div class="modal-body">
            <p>{{ containTitle }}</p>
        </div>
        <div class="modal-footer"> <a data-dismiss="modal" class="btn " href="#" @click="close()">取消</a> <a data-dismiss="modal" class="btn btn-danger" href="#" @click="configStart()">确定</a> </div>
    </div>
    <div class="modal-backdrop in" v-if="delete"></div>
    <div id="forbid" class="modal" v-if="delete">
        <div class="modal-header">
            <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
            <h3>删除</h3>
        </div>
        <div class="modal-body">
            你确定删除该音乐类！</strong>
        </div>
        <div class="modal-footer">
            <a data-dismiss="modal" class="btn " href="#" @click="close()">取消</a>
            <a data-dismiss="modal" class="btn btn-danger" href="#" @click="configDelete()">确定</a>
        </div>
    </div>
    <div class="modal-backdrop in" v-if="add"></div>
    <div id="forbid" class="modal" v-if="add">
        <div class="modal-header">
            <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
            <h3>新增音乐</h3>
        </div>
        <div class="modal-body form-horizontal">
            <div class="control-group">
                <label class="control-label">音乐名称</label>
                <div class="controls">
                    <input type="text" name="source" id="source" placeholder="请输入类别名称" v-model="name">
                </div>
            </div>
            <div class="control-group">
                <label class="control-label">音乐类别</label>
                <div class="controls">
                    <select class="mr20" id="regTimeDirection" v-model="createMcId">
                        <option value="{{item.mcId}}" v-for="item of musicClassDTOs">{{item.name}}</option>
                    </select>
                </div>
            </div>
            <div class="control-group ">
                <label class="control-label">文件上传</label>
                <div class="clearfix controls ">
                    <qiniu event-Name="musicFile" :defaultimg="musicFile" type="music"></qiniu>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <a data-dismiss="modal" class="btn " href="javascript:;" @click="close()">取消</a>
            <a data-dismiss="modal" class="btn btn-danger" href="javascript:;" @click="configMusic()">确定</a>
        </div>
    </div>
</template>
<script type="text/javascript">
    import Vue from "vue"
    import zpagenav from "vue-pagenav"
    import $ from "jquery"
    import {
        obtainMusicClasses,
        searchMusicSongs,
        enableMusicSong,
        deleteMusicSong,
        createMusicSong
    } from "../../api"

    import qiniu from "../../qiniu.vue"

    export default {
        data() {
            return {

                page: 1, //pagepageSize: 10 //pageSize,  default is 10
                total: 0, //total item count
                maxLink: 10, //how many links to show, must not less than 5,  default is 5
                pageSize: 10,

                list: [],
                musicClassDTOs: [],
                name: "",
                musicFile: "",
                musicName: "",
                createMcId: "",
                descp: '',
                disable: '',
                start: '',
                add: "",
                delete: "",
                words: "",
                mcId: "",
                isEnable: "",
                arrayTypeId: [],
                checkState: false,
                containTitle: "请勾选操作的内容！"
            }
        },
        components: {
            qiniu
        },

        events: {
            'imgParameter': function(obj, eventName) {
                this[eventName] = obj[eventName].imgPath
            }
        },

        watch: {
            page() {
                console.log(this.page)
                this.searchMusicSongs()
            }
        },
        methods: {

            pageHandler(page) {
                //here you can do custom state update
                this.page = page
            },
            createUrl(unit) {
                return unit.page > 1 ? '#page=' + unit.page : '#'
            },

            seach() {
                this.searchMusicSongs()
            },

            changeFn(e) {
                this.checkState = e.target.checked
            },

            btnDisable() {
                this.deleteFn()
                this.containTitle = (this.arrayTypeId.length > 0 ? "您确定禁用当前音乐状态？" : this.containTitle)
                this.disable = true
            },
            btnStart() {
                this.deleteFn()
                this.containTitle = (this.arrayTypeId.length > 0 ? "您确定启用当前音乐状态？" : this.containTitle)
                this.start = true

            },

            btnDelete() {
                this.deleteFn()
                this.delete = true
            },

            configDisable() {
                this.enableMusicSong(`isEnable=1&ids=${this.arrayTypeId}`)

            },

            configStart() {
                this.enableMusicSong(`isEnable=0&ids=${this.arrayTypeId}`)
            },

            configDelete() {
                this.deleteMusicSong(`ids=${this.arrayTypeId}`)
            },


            close() {
                this.disable = false
                this.start = false
                this.delete = false
                this.add = false
            },
            deleteFn() {
                let self = this
                this.idelete = true
                $('table tbody input:checked').each(function() {
                    self.arrayTypeId.push(Number($(this).attr('data-typeid')))
                })
            },

            fileUploadMusic(e) {
                let self = this
                this.file = e.target.files[0]

                fileUpload(this.file, (data) => {
                    let dataMusic = data.files[0]

                    this.musicName = self.file.name
                    this.musicFile = dataMusic.fileRelPath
                    this.fileType = self.file.type.split('/').pop()
                })
            },

            addFn() {
                this.add = true
                this.name = ""
                this.musicName = ""
                this.createMcId = ""
            },

            configMusic() {
                this.createMusicSong()
            },

            async searchMusicSongs(params = `mcId=${this.mcId}&pageIndex=${this.page}&pageSize=${this.pageSize}&words=${this.words}`) {
                let data = await searchMusicSongs(params)

                if (data.code === 0) {
                    this.checkState = false

                    this.list = data.musicSongDTOs
                    this.total = data.count
                } else {
                    alert(data.msg)
                }
            },

            async obtainMusicClasses(params = `pageIndex=${1}&pageSize=${100}`) {
                let data = await obtainMusicClasses(params)

                if (data.code === 0) {
                    this.musicClassDTOs = data.musicClassDTOs
                }
                this.searchMusicSongs()
            },

            async enableMusicSong(params = `isEnable=${this.isEnable}&ids=${this.arrayTypeId}`) {
                let data = await enableMusicSong(params)

                data.code === 0 && this.searchMusicSongs()

                this.disable = false
                this.start = false

                this.arrayTypeId = []
            },

            async deleteMusicSong(params = `ids=${this.arrayTypeId}`) {
                let data = await deleteMusicSong(params)

                data.code === 0 && this.searchMusicSongs()

                this.delete = false
                this.arrayTypeId = []
            },

            async createMusicSong(params = `filePath=${this.musicFile}&fileType=${this.fileType}&isEnable=1&mcId=${this.createMcId}&name=${this.name}`) {
                let data = await createMusicSong(params)

                data.code === 0 && this.searchMusicSongs()

                this.add = false

            }
        },

        filters: {
            isEnableFilter(tag) {
                let arr = ['启用', '禁用']
                return arr[tag]
            }
        },

        ready() {
            this.obtainMusicClasses()
        }
    }
</script>