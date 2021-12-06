<template>
  <div>
    <el-tabs tab-position="left" @tab-click="change">
      <el-tab-pane v-for="item in favLists" :key="item.id" :label="item.title">
        <el-table :data="favs" style="width: 100%" max-height="500">
          <el-table-column label="播放" width="70">
            <template slot-scope="scope">
              <el-button icon="el-icon-video-play" type="primary" size="small" @click="play(scope.row)"
                         circle></el-button>
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
              <el-button size="mini" @click="startEdit(scope.row)" style="margin-right: 10px">编辑</el-button>
              <el-popconfirm icon="el-icon-info" icon-color="red" :title="'确定要删除'+scope.row.upper+'的直播间吗?'"
                             @confirm="del(scope.row)">
                <el-button size="mini" type="danger" slot="reference">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!--        <div style="text-align:center;margin-top:10px">-->
        <!--          <el-pagination-->
        <!--              background-->
        <!--              @size-change="handleSizeChange"-->
        <!--              @current-change="handleCurrentChange"-->
        <!--              :current-page="currentPage4"-->
        <!--              :page-sizes="[5, 10, 20, 50]"-->
        <!--              :page-size="100"-->
        <!--              layout="total, sizes, prev, pager, next, jumper"-->
        <!--              :total="400">-->
        <!--          </el-pagination>-->
        <!--        </div>-->
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="编辑收藏项" :visible.sync="editFavDisplay" width="30%" @close="loadList(favSelected.fid)">
      <el-form label-position="right" size="small" :inline="true">
        <el-form-item label="ID :">
          <el-tag size="small">{{ favSelected.id }}</el-tag>
        </el-form-item>
        <el-form-item label="排序 :">
          <el-input-number size="small" v-model="favSelected.order"></el-input-number>
        </el-form-item>
        <el-form-item label="平台 :">
          <el-select v-model="favSelected.plat" placeholder="请选择平台">
            <el-option v-for="(plat,i) in $store.state.plats" :key="i" :label="plat.name" :value="plat.id"></el-option>
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
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "index",
  methods: {
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
    startEdit(data) {
      console.log(data);
      this.editFavDisplay = true
      this.favSelected = data
      console.log(this.favSelected);
    },
    del(data) {
      this.$axios.post(`${this.$store.getters["player/getHTTP"]}/fav/del`, {
        id: data.id
      }).then(resp => {
        const d = resp.data
        if (d.code !== 0) {
          this.$message.error(`删除[${data.upper}]的直播间失败: ${d.msg}`)
          return
        }
        this.$message.success(`删除[${data.upper}]的直播间成功!`)
        this.loadList(data.fid)
      })
      console.log(data);
    },
    play(data) {
      console.log(data);
    },
    change(data) {
      const list = this.favLists[data.index]
      this.loadList(list.id)
    },
    loadList(id) {
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
          })
    }
  },
  mounted() {
    this.getFavLists()
  },
  data() {
    return {
      favLists: [],
      favs: [],
      favSelected: {},
      editFavDisplay: false,
      favForm: {}
    }
  }
}
</script>

<style scoped>

</style>
