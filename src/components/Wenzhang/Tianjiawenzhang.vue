<template>
  <div class="index">
    <div class="nav1">
      <el-button @click="toBack" class="btn" size="small" icon="el-icon-arrow-left">返回</el-button>
      <div class="tit1">文章管理</div>
    </div>
    <div class="nav2">
      <div class="tit1">
        <el-tabs v-model="activeName">
          <el-tab-pane label="文章信息" name="1"></el-tab-pane>
          <!-- <el-tab-pane label="商品详情" name="2"></el-tab-pane> -->
          <!-- <el-tab-pane label="其他设置" name="3"></el-tab-pane> -->
        </el-tabs>
        <!-- 商品信息 -->
        <template v-if="activeName == '1'">
          <el-row>
            <el-col :span="12">
              <div class="myForm">
                <el-form :model="lhForm" ref="lhForm" label-width="100px" class="demo-ruleForm">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="标题：">
                        <el-input size="small" v-model="lhForm.title"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <!-- <el-row>
                <el-col :span="24">
                  <el-form-item label="封面图：">
                    <div @click="companyList" class="myImg">
                      <el-image :src="lhForm.pic" fit="fill" style="width: 60px; height: 60px">
                        <div slot="error" class="image-slot">
                          <i class="el-icon-picture-outline"></i>
                        </div>
                      </el-image>
                      <div @click.stop="delImg" class="closeBtn">
                        <el-button circle>×</el-button>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
                  </el-row>-->
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="类型：">
                        <el-select size="small" v-model="lhForm.type" placeholder="请选择">
                          <el-option label="咨询" value="advice"></el-option>
                          <el-option label="新闻" value="news"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <div class="myEditor">
                        <div class="txt">商品详情：</div>
                        <div id="editor"></div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-form-item>
                    <!-- <el-button v-if="this.wenzhangObj" size="small" @click="huifuzancun">恢复暂存</el-button> -->
                    <!-- <el-button v-if="this.wenzhangObj" size="small" @click="zancun">暂存</el-button> -->
                    <el-button size="small" type="primary" @click="onSubmitForm">保存</el-button>
                    <el-button size="small" @click="yulan">刷新预览</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="rright">
                <div class="txt">预览：</div>
                <div class="preview-wrapper">
                  <div class="preview-header">H5预览</div>

                  <section>
                    <iframe id="myframe" class="preview-content" src="/H5" frameborder="0" />
                  </section>
                </div>
              </div>
            </el-col>
          </el-row>
        </template>
      </div>
    </div>
    <input
      type="file"
      name="companyLogo"
      id="file0"
      class="displayN"
      multiple="multiple"
      @change="companyLogo($event)"
      ref="fileInputList"
    />
  </div>
</template>

<script>
import E from "wangeditor";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["wenzhangObj", "h5ValArr"])
  },
  data() {
    return {
      radioArr: [],
      radioArr2: [],
      editId: "",
      activeName: "1",
      editor: null,
      tableData: [],
      total: 0,
      lhDialogVisible: false,
      lhForm: {
        title: "",
        content: "",
        pic: "",
        type: ""
      },
      imgFile: "",
      isAdd: true
    };
  },
  created() {
    this.getData();
    console.log(this.h5ValArr);
  },
  methods: {
    async getData() {
      console.log(this.wenzhangObj);
      if (this.wenzhangObj) {
        // 编辑
        this.editId = this.wenzhangObj.id;
        this.lhForm.title = this.wenzhangObj.title;
        // this.lhForm.pic = this.wenzhangObj.img;
        this.lhForm.content = this.wenzhangObj.content;
        this.lhForm.type = this.wenzhangObj.tag;
      }
      const res = await this.$api.articlesTypes();
      this.radioArr = res.data;
      console.log(this.lhForm);
    },
    // 上传图片
    companyList() {
      this.$refs.fileInputList.click();
    },
    companyLogo(event) {
      var file = event.target.files[0];
      this.imgFile = file;
      this.uploading(true);
      this.$refs.fileInputList.value = "";
    },
    //将文件转为blob类型
    readFileAsBuffer(file) {
      const reader = new FileReader();
      return new Promise(resolve => {
        reader.readAsDataURL(file);
        reader.onload = function() {
          const base64File = reader.result.replace(
            /^data:\w+\/\w+;base64,/,
            ""
          );
          resolve(new window.OSS.Buffer(base64File, "base64"));
        };
      });
    },
    async uploading(flag) {
      // console.log(document.getElementById("file0").value);
      if (flag) {
        var file_re = await this.readFileAsBuffer(this.imgFile);
        const res = await this.$api.uploadToken();
        let myData = res.data;
        console.log(myData);
        let client = new window.OSS.Wrapper({
          region: myData.region, //oss地址
          accessKeyId: myData.accessKeyId, //ak
          accessKeySecret: myData.accessKeySecret, //secret
          stsToken: myData.stsToken,
          bucket: myData.bucket //oss名字
        });
        var imgtype = this.imgFile.type.substr(6, 4);
        var store = `${new Date().getTime()}.${imgtype}`;
        client.put(store, file_re).then(() => {
          //这个结果就是url
          console.log(store);
          // var oss_imgurl = client.signatureUrl(store);
          var oss_imgurl = `https://${myData.bucket}.${myData.url}/${store}`;
          this.$set(this.lhForm, "pic", oss_imgurl);
          console.log(oss_imgurl);
        });
      }
    },
    // 删除图片
    delImg() {
      this.$set(this.lhForm, "pic", "");
    },
    zancun() {
      if (this.wenzhangObj) {
        // 编辑
        this.editId = this.wenzhangObj.id;
        var obj = {
          id: this.wenzhangObj.id,
          val: document.getElementsByClassName("w-e-text")[0].innerHTML
        };
      }
      this.$store.commit("h5ValArr", obj);
      this.$message({
        message: "已缓存"
      });
    },
    huifuzancun() {
      console.log(this.h5ValArr);
      var myLength = 0;
      var myObj = null;
      this.h5ValArr.forEach(ele => {
        if (ele.id == this.wenzhangObj.id) {
          myLength = 1;
          myObj = ele;
        }
      });
      if (myLength == 0) {
        this.$message({
          message: "暂无缓存",
          type: "warning"
        });
      } else {
        this.editor.txt.html(myObj.val);
      }
    },
    // 保存
    async onSubmitForm() {
      this.lhForm.content = document.getElementsByClassName(
        "w-e-text"
      )[0].innerHTML;
      // this.$store.commit('h5Val',this.lhForm.content);
      console.log(this.lhForm);
      sessionStorage.setItem("isH5", "yes");
      sessionStorage.setItem("isH5zhanshi", "no");
      document.getElementById("myframe").contentWindow.location.reload(true);
      if (!this.wenzhangObj) {
        // 添加
        const res = await this.$api.addArticle({
          title: this.lhForm.title,
          img: this.lhForm.pic,
          content: this.lhForm.content,
          tag: this.lhForm.type
        });
        console.log(res);
        if (res.code == 200) {
          this.$message({
            message: "添加成功",
            type: "success"
          });
          setTimeout(() => {
            this.$router.push({ name: "Wenzhangliebiao" });
          }, 500);
        } else {
          this.$message.error(res.msg);
          this.getData();
        }
      } else {
        // 编辑
        const res = await this.$api.upLoadArticle(
          {
            title: this.lhForm.title,
            img: this.lhForm.pic,
            content: this.lhForm.content,
            tag: this.lhForm.type
          },
          this.editId
        );
        console.log(res);
        if (res.code == 200) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          setTimeout(() => {
            this.$router.push({ name: "Wenzhangliebiao" });
          }, 500);
        } else {
          this.$message.error(res.msg);
          this.getData();
        }
      }
      console.log(this.ruleForm);
    },
    // 添加sku小类
    addskuxiao(item1) {
      console.log(item1);
      if (item1.inpVal == "") {
        this.$message({
          message: "内容不能为空",
          type: "warning"
        });
      } else {
        item1.arr.push(item1.inpVal);
        item1.inpVal = "";
      }
    },
    // 添加sku大类
    addskuda() {
      if (this.addSkuDa.gg == "" || this.addSkuDa.ggz == "") {
        this.$message({
          message: "内容不能为空",
          type: "warning"
        });
      } else {
        this.sku.push({
          tit: this.addSkuDa.gg,
          arr: [this.addSkuDa.ggz],
          inpVal: ""
        });
        this.addSkuDa.gg = "";
        this.addSkuDa.ggz = "";
        this.isAdd = false;
      }
    },
    // 删除sku大类
    removeskuda(index) {
      this.sku.splice(index, 1);
    },
    // 删除sku小类
    removeskuxiao(index, i) {
      this.sku[index].arr.splice(i, 1);
    },
    // 删除sku表格中一项
    delTabSku(rowIndex) {
      console.log(rowIndex);
      this.skuTableData.splice(rowIndex, 1);
    },
    // 返佣批量设置
    fanyongPLSZ() {
      this.skuTableData.forEach((ele, i) => {
        this.$set(this.skuTableData[i], "brokerage", this.plszForm.brokerage);
        this.$set(
          this.skuTableData[i],
          "brokerage_two",
          this.plszForm.brokerage_two
        );
        this.$set(this.skuTableData[i], "vip_price", this.plszForm.vip_price);
      });
    },

    submitForm(formName, i) {
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     alert("submit!");
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
      console.log(formName, this.ruleForm, this.skuTableData);
      this.activeName = i;
    },
    async qtszOnSubmit() {
      this.content = document.getElementsByClassName("w-e-text")[0].innerHTML;
      this.skuTableData.forEach(ele => {
        ele.detail = {};
        delete ele._XID;
        for (const key in ele) {
          var pattern = new RegExp("[\u4E00-\u9FA5]+");
          if (pattern.test(key)) {
            ele.detail[key] = ele[key];
            delete ele[key];
          }
        }
      });
      this.sku.forEach(ele => {
        ele.value = ele.tit;
        ele.detail = [...ele.arr];
        delete ele.inpVal;
        delete ele.tit;
        delete ele.arr;
      });
      console.log(this.ruleForm, this.qtszForm, this.skuTableData, this.sku);
      if (this.wenzhangObj) {
        // 编辑
        const res = await this.$api.productSave({
          ...this.ruleForm,
          category_id: this.ruleForm.category_id[1].toString(),
          ...this.qtszForm,
          is_show: this.qtszForm.is_show == "上架" ? "1" : "0",
          attrs: this.skuTableData,
          items: this.sku,
          description: this.content,
          is_postage: "0",
          is_hot: "0",
          is_best: "0",
          is_new: "0",
          spec_type: "1",
          activity: "0,3",
          id: this.wenzhangObj.id
        });
        console.log(res);
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          setTimeout(() => {
            this.$router.push({ name: "Shangpinguanli" });
          }, 500);
        } else {
          this.$message.error(res.msg);
          this.getData();
        }
      } else {
        const res = await this.$api.productSave({
          ...this.ruleForm,
          category_id: this.ruleForm.category_id[1].toString(),
          ...this.qtszForm,
          is_show: this.qtszForm.is_show == "上架" ? "1" : "0",
          attrs: this.skuTableData,
          items: this.sku,
          description: this.content,
          is_postage: "0",
          is_hot: "0",
          is_best: "0",
          is_new: "0",
          spec_type: "1",
          activity: "0,3"
        });
        console.log(res);
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          setTimeout(() => {
            this.$router.push({ name: "Wenzhangliebiao" });
          }, 500);
        } else {
          this.$message.error(res.msg);
          this.getData();
        }
      }
    },
    toBack() {
      this.$router.push({ name: "Wenzhangliebiao" });
    },
    yulan() {
      sessionStorage.setItem(
        "h5Val",
        document.getElementsByClassName("w-e-text")[0].innerHTML
      );
      sessionStorage.setItem("isH5", "yes");
      sessionStorage.setItem("isH5zhanshi", "yes");
      document.getElementById("myframe").contentWindow.location.reload(true);
    }
  },
  mounted() {
    const that = this;
    this.editor = new E("#editor");
    this.editor.config.menus = [
      "head",
      "bold",
      "fontSize",
      "fontName",
      "italic",
      "underline",
      "strikeThrough",
      "indent",
      "lineHeight",
      "foreColor",
      "backColor",
      "list",
      "justify",
      "emoticon",
      "image",
      "table",
      "undo",
      "redo"
    ];
    this.editor.config.uploadImgServer = "/upload-img";
    // this.editor.config.uploadImgShowBase64 = true; // 使用 base64 保存图片
    this.editor.config.customUploadImg = async function(
      resultFiles,
      insertImgFn
    ) {
      // resultFiles 是 input 中选中的文件列表
      // insertImgFn 是获取图片 url 后，插入到编辑器的方法
      console.log(resultFiles);
      that.imgFile = new FormData();
      that.imgFile.append("img", resultFiles[0]);
      const res = await that.$api.upload_banner(that.imgFile);
      insertImgFn(res.data.path);
    };
    this.editor.create();
    this.editor.txt.html(this.lhForm.content);
    sessionStorage.setItem("h5Val", this.lhForm.content);
    sessionStorage.setItem("isH5", "yes");
    sessionStorage.setItem("isH5zhanshi", "yes");
    document.getElementById("myframe").contentWindow.location.reload(true);
  }
};
</script>

<style lang="scss" scoped>
.index {
}
.nav1 {
  margin: 0 -18px;
  background-color: #fff;
  padding: 20px 32px 0 40px;
  display: flex;
  .btn {
    transform: translateY(-4px);
    height: 30px;
    margin-right: 10px;
  }
  .tit1 {
    color: #17233d;
    font-weight: 500;
    font-size: 20px;
    padding-bottom: 20px;
  }
  .tit2 {
    margin-top: 10px;
    /deep/ .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
      padding-left: 20px;
    }
    /deep/ .el-tabs__header {
      margin: 0 0 1px;
    }
  }
}
.nav2 {
  margin: 18px 0;
  background: #fff;
  border-radius: 6px;
  padding: 24px;
  .tit1 {
    margin-top: 10px;
  }
  .myForm {
    margin-top: 10px;
    /deep/ .el-cascader {
      width: 100%;
    }
    /deep/ .el-form-item__label {
      font-size: 12px;
    }
    /deep/ .el-checkbox__label {
      font-size: 12px;
    }
    /deep/ .el-radio__label {
      font-size: 12px;
    }
    /deep/ .el-row {
      margin-right: 0px !important;
    }
    /deep/ .el-radio {
      margin-right: 10px;
    }
    .flex-gg {
      /deep/ .el-select {
        width: 50%;
      }
    }
    .sku {
      .tit1 {
        display: flex;
        align-items: center;
        .txt1-1 {
          margin-right: 4px;
          color: #515a6e;
          font-size: 12px;
        }
        .el-icon-error {
          cursor: pointer;
        }
      }
      .tit2 {
        border: 1px solid #dcdfe6;
        display: inline-block;
        height: 30px;
        border-radius: 4px;
        padding: 0 8px;
        margin-right: 8px;
        .blue {
          transform: translateY(-5px);
          display: inline-block;
          background: #2d8cf0;
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }
        .txt1 {
          transform: translateY(-6px);
          margin-left: 4px;
          display: inline-block;
          font-size: 12px;
          color: #515a6e;
        }
        .txt2 {
          cursor: pointer;
          transform: translateY(-5px);
          margin-left: 6px;
          display: inline-block;
          font-size: 16px;
          color: #999999;
        }
      }
      .addGg {
        transform: translateY(-2px);
        display: inline-block;
        width: 200px !important;
        /deep/ .el-input-group__append {
          border: 0;
          background: #409eff;
          color: #ffffff;
          font-size: 12px;
        }
      }
    }
    .footer {
      display: flex;
      align-items: center;
      width: 900px;
      .tit1 {
        margin-right: 20px;
        display: flex;
        .txt1 {
          width: 40px;
          font-size: 12px;
          color: #606266;
        }
        /deep/ .el-input {
          width: 160px;
        }
        .txt2.txt1 {
          width: 52px;
        }
      }
      .btns {
        transform: translateY(4px);
        width: 180px;
        display: inline-block;
      }
    }
    .footer2.footer {
      // transform: translate(-41px, -12px);
      transform: translate(0px, -10px);
    }
    .mySkuTable {
      margin-top: 16px;
      min-width: 800px;
      width: 60vw;
      /deep/ .vxe-table--render-default .vxe-body--column {
        line-height: 40px;
      }
      /deep/ .el-input__inner {
        padding: 0 0 0 10px;
      }
    }
  }
}
/deep/ .el-input-group__append {
  cursor: pointer;
}

.btnflex {
  margin-top: 20px;
  margin-left: 101px;
}
.displayN {
  display: none;
}
.lhmyForm {
  /deep/ .el-form-item__label {
    font-size: 12px;
  }
  /deep/ .el-form-item {
    margin-right: 30px;
    margin-bottom: 20px;
  }
  .search {
    margin-top: 3px;
    /deep/ .el-select {
      width: 100px;
    }
  }
}
.myImg {
  position: relative;
  width: 60px;
  height: 60px;
  display: inline-block;
  margin-right: 12px;
  .closeBtn {
    position: absolute;
    top: -6px;
    right: -4px;
    width: 20px;
    height: 20px;
    .el-button {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  /deep/ .image-slot {
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #fafafa;
    width: 58px;
    height: 58px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .el-icon-picture-outline {
      font-size: 20px;
    }
  }
}
// 详情
.myEditor {
  display: flex;
  .txt {
    color: #606266;
    width: 90px !important;
    font-size: 12px;
    margin-right: 12px;
    margin-top: 2px;
    text-align: right;
  }
  #editor {
    transform: translateY(-6px);
    width: 90%;
  }
}
.rright {
  margin-top: 20px;
  .txt {
    color: #606266;
    width: 90px !important;
    font-size: 12px;
    margin-right: 12px;
    margin-top: 2px;
    text-align: right;
  }
  .preview-wrapper {
    margin-left: 50px;
    width: 377px;
    height: 620px;
  }
  .preview-header {
    color: #ffffff;
    line-height: 20px;
    height: 20px;
    margin-top: 20px;
    text-align: center;
    background: -webkit-gradient(
      linear,
      left top,
      left bottom,
      from(rgba(55, 55, 55, 0.98)),
      to(#545456)
    );
    background: -webkit-linear-gradient(rgba(55, 55, 55, 0.98), #545456);
    background: linear-gradient(rgba(55, 55, 55, 0.98), #545456);
    border-radius: 4px 4px 0 0;
  }

  .preview-statbar {
    height: 20px;
    margin-bottom: 4px;
    .preview-img {
      width: 96%;
      height: 80%;
      margin: 0 2%;
      vertical-align: middle;
      border-style: none;
    }
  }

  .preview-content {
    width: 377px;
    height: 600px;
    overflow: auto;
    border-top: none;
    border-right: 1px solid rgb(247, 247, 247);
    border-bottom: 1px solid rgb(247, 247, 247);
    border-left: 1px solid rgb(247, 247, 247);
    border-image: initial;
    box-shadow: #dddddd 0 2px 4px;
  }
}
</style>