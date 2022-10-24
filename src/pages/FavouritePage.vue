<template>
  <div>
    <el-page-header @back="goBack" content="收藏夹" />
    <el-card shadow="never">
      <el-table :data="favs" style="width: 100%">
        <el-table-column label="播放" width="70">
          <template slot-scope="scope">
            <el-button icon="el-icon-video-play" :type="favInfo[scope.row.id].status === 1 ? 'primary' : ''"
              size="small" @click="play(scope.row)" circle>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="ID" width="70">
          <template slot-scope="scope">
            <el-tag effect="dark" type="info">{{ scope.row.id }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="平台" width="100">
          <template slot-scope="scope">
            <el-tag effect="dark" type="info">{{ $store.getters.getPlat(scope.row.plat).name }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="房间" width="100">
          <template slot-scope="scope">
            <el-tag effect="dark">{{ scope.row.room }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="主播" width="200">
          <template slot-scope="scope">
            <el-tag effect="dark">{{ scope.row.upper }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="排序" width="70">
          <template slot-scope="scope">
            <el-tag effect="dark" type="info">{{ scope.row.order }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="startEditFav(scope.row)" style="margin-right: 10px">编辑</el-button>
            <el-popconfirm icon="el-icon-info" icon-color="red" :title="'确定要删除' + scope.row.upper + '的直播间吗?'"
              @confirm="favDel(scope.row)">
              <el-button size="mini" type="danger" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-button type="primary" size="small" round style="margin-top: 10px" @click="addFavListDisPlay = true">
      新增
    </el-button>
    <el-button type="primary" size="small" round style="margin-top: 10px" @click="editFavListDisPlay = true">
      编辑
    </el-button>
    <el-popconfirm icon="el-icon-info" icon-color="red" :title="'确定要删除[' + favListSelected.title + ']收藏夹吗?'"
      @confirm="favListDel(favListSelected)">
      <el-button size="small" type="danger" round slot="reference" style="margin-left: 7px">删除</el-button>
    </el-popconfirm>
    <el-dialog title="编辑收藏项" :visible.sync="editFavDisplay" :close-on-click-modal="false" width="30%"
      @close="loadFavList(favSelected.fid)">
      <el-form label-position="right" size="small" :inline="true">
        <el-form-item label="ID :">
          <el-tag size="small">{{ favSelected.id }}</el-tag>
        </el-form-item>
        <el-form-item label="排序 :">
          <el-input-number :min="0" :max="100" size="small" v-model="favSelected.order"></el-input-number>
        </el-form-item>
        <el-form-item label="平台 :">
          <el-select v-model="favSelected.plat" placeholder="请选择平台">
            <el-option v-for="(plat, i) in $store.state.plats" :key="i" :label="plat.name" :value="plat.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房间 :">
          <el-input v-model="favSelected.room"></el-input>
        </el-form-item>
        <el-form-item label="主播 :">
          <el-input v-model="favSelected.upper"></el-input>
        </el-form-item>
        <el-form-item label="创建时间 :">
          <el-tag size="small">{{ transformTime(favSelected['created_at']) }}</el-tag>
        </el-form-item>
        <el-form-item label="上次修改 :">
          <el-tag size="small">{{ transformTime(favSelected['updated_at']) }}</el-tag>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFavDisplay = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新增收藏夹" :visible.sync="addFavListDisPlay" :close-on-click-modal="false" width="30%">
      <el-form label-position="right" size="small" :inline="true">
        <el-form-item label="标题 :" prop="title">
          <el-input :minlength="2" :maxlength="60" v-model="favListAddForm.title"></el-input>
        </el-form-item>
        <el-form-item label="排序 :" prop="order">
          <el-input-number :min="0" :max="100" size="small" v-model="favListAddForm.order"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="getFavLists(); addFavListDisplay = false">取 消</el-button>
        <el-button type="primary" @click="confirmAddList">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑收藏夹" :visible.sync="editFavListDisPlay" :close-on-click-modal="false" width="20%">
      <el-form label-position="right" size="small" :inline="true">
        <el-form-item label="ID :">
          <el-tag size="small">{{ favListSelected.id }}</el-tag>
        </el-form-item>
        <el-form-item label="标题 :" prop="title">
          <el-input :minlength="2" :maxlength="60" v-model="favListSelected.title"></el-input>
        </el-form-item>
        <el-form-item label="排序 :" prop="order">
          <el-input-number :min="0" :max="100" size="small" v-model="favListSelected.order"></el-input-number>
        </el-form-item>
        <el-form-item label="创建时间 :">
          <el-tag size="small">{{ transformTime(favListSelected['created_at']) }}</el-tag>
        </el-form-item>
        <el-form-item label="上次修改 :">
          <el-tag size="small">{{ transformTime(favListSelected['updated_at']) }}</el-tag>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="getFavLists(); editFavListDisPlay = false">取 消</el-button>
        <el-button type="primary" @click="confirmEditList">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "FavouritePage",
  methods: {
    goBack() {
      this.$router.back();
    },
    transformTime(unix) {
      return moment.unix(unix).format("YYYY-MM-DD HH:mm")
    },
    confirmEdit() {
      this.$axios.post(`${this.$store.getters["player/getHTTP"]}/fav/edit`, this.favSelected)
        .then(resp => {
          const d = resp.data
          if (d.code !== 0) {
            this.$message.error(`编辑收藏项错误: ${d.msg}`)
            return
          }
          this.$message.success(`编辑成功!`)
          this.editFavDisplay = false
        })
    },
    confirmAddList() {
      this.$axios.post(`${this.$store.getters["player/getHTTP"]}/fav/list/add`, this.favListAddForm)
        .then(resp => {
          const d = resp.data
          if (d.code !== 0) {
            this.$message.error(`新增收藏夹失败: ${d.msg}`)
            return
          }
          this.$message.success(`添加成功!ID: ${d.data.id}`)
          this.addFavListDisPlay = false
          this.getFavLists()
        })
    },
    confirmEditList() {
      this.$axios.post(`${this.$store.getters["player/getHTTP"]}/fav/list/edit`, this.favListSelected)
        .then(resp => {
          const d = resp.data
          if (d.code !== 0) {
            this.$message.error(`新增收藏夹失败: ${d.msg}`)
            return
          }
          this.$message.success(`编辑成功!`)
          this.editFavListDisPlay = false
          this.getFavLists()
        })
    },
    startEditFav(data) {
      console.log(data);
      this.editFavDisplay = true
      this.favSelected = data
      console.log(this.favSelected);
    },
    favDel(data) {
      this.$axios.post(`${this.$store.getters["player/getHTTP"]}/fav/del`, {
        id: data.id
      }).then(resp => {
        const d = resp.data
        if (d.code !== 0) {
          this.$message.error(`删除[${data.upper}]的直播间失败: ${d.msg}`)
          return
        }
        this.$message.success(`删除[${data.upper}]的直播间成功!`)
        this.loadFavList(data.fid)
      })
      console.log(data);
    },
    favListDel(data) {
      this.$axios.post(`${this.$store.getters["player/getHTTP"]}/fav/list/del`, {
        id: data.id
      }).then(resp => {
        const d = resp.data
        if (d.code !== 0) {
          this.$message.error(`删除[${data.title}]收藏夹失败: ${d.msg}`)
          return
        }
        this.$message.success(`删除[${data.title}]收藏夹成功!`)
        this.getFavLists()
      })
      console.log(data);
    },
    play(data) {
      this.$router.replace(`/live?room=${data.room}&plat=${data.plat}`)
      location.reload()
    },
    favSelectedChange(data) {
      const list = this.favLists[data.index]
      this.favListSelected = list
      this.loadFavList(list.id)
    },
    loadFavList(id) {
      this.$axios.get(`${this.$store.getters["player/getHTTP"]}/fav/list/get`, {
        params: {
          id: id
        }
      }).then(resp => {
        const d = resp.data
        console.log(d);
        if (d.code !== 0) {
          this.$message.error(`获取ID为${id}收藏夹失败: ${d.msg}`)
          return
        }
        this.favs = d.data.favorites.sort(function (a, b) {
          return b.order - a.order
        })

        let req = [];
        this.favs.forEach((fav) => {
          req.push({
            id: fav.id.toString(),
            plat: fav.plat,
            room: fav.room
          })
        })
        this.$axios.post(`${this.$store.getters["player/getHTTP"]}/live/room_infos`, req)
          .then(resp => {
            this.favInfo = resp.data.data;
            console.log(resp.data.data);
          })
      })
    },
    getFavLists() {
      this.$axios.get(`${this.$store.getters["player/getHTTP"]}/fav/list/get_all`)
        .then(resp => {
          const d = resp.data
          if (d.code !== 0) {
            this.$message.error(`获取收藏夹失败: ${d.msg}`)
            return
          }
          this.favLists = d.data
          this.favLists.sort(function (a, b) {
            return b.order - a.order
          })
          console.log(this.favLists);
          this.loadFavList(this.favLists[0].id)
          this.favSelectedChange({ index: 0 })
        })
    },
  },
  mounted() {
    this.getFavLists()
  },
  data() {
    return {
      favLists: [],
      favs: [],
      favSelected: {},
      favInfo: {},
      favListSelected: 0,
      favListAddForm: {
        title: "新增收藏夹",
        order: 1
      },
      editFavDisplay: false,
      addFavListDisPlay: false,
      editFavListDisPlay: false,
      favForm: {}
    }
  }
}
</script>

<style scoped>
.el-page-header {
  margin: 16px;
}
</style>
