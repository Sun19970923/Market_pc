<template>
  <!-- 创建页面 -->
  <div class="content-wrapper">
    <div class="content-create">
      <div class="title">{{ $t("create.title") }}</div>
      <div class="introduce">{{ $t("create.introduce") }}</div>

      <div class="item-page">
        <div class="create-order">
            <div class="detail-sign" span="10">
              <div class="select">
                <div @click="to721" class="sel-row" to="/create/erc721">
                  <div class="inner">
                    <div class="cover">
                      <div class="pic-img">
                        <img src="@/assets/create-img/single.png" />
                      </div>
                    </div>
                    <div class="enter">
                      <div class="text">{{ $t("create.single") }}</div>
                      <img
                        class="pic-icon"
                        src="@/assets/img/enter.png"
                        alt=""
                      />
                    </div>
                  </div>
                </div>

                <div @click="to1155" class="sel-row" to="/create/erc1155">
                  <div class="inner">
                    <div class="cover">
                      <div class="pic-img">
                        <img src="@/assets/create-img/multiple.png" />
                      </div>
                    </div>
                    <div class="enter">
                      <div class="text">{{ $t("create.multiple") }}</div>
                      <img
                        class="pic-icon"
                        src="@/assets/img/enter.png"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="introduce">
                <img src="@/assets/create-img/igw-f-sign.png" />
                <span>{{ $t("create.prompt") }}</span>
              </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs, computed } from "vue";

export default {
  name: "Create",
  data: function () {
    return {};
  },
  created() {},
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    to721() {
      if (!this.$tools.needLogin()) return;
      this.$router.push("/create/erc721");
    },
    to1155() {
      if (!this.$tools.needLogin()) return;
      this.$router.push("/create/erc1155");
    },
  },
};
</script>

<style lang="scss" scoped>
.content-create{
  max-width: 720px;
  width: 100%;
  margin: 0 auto;
}
.create-order {
  padding-bottom: 100px;
}
.go-back {
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 16px;
  font-family: "Montserrat-Regular";
  font-weight: 400;
  color: #000000;
  line-height: 48px;
}
.title {
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin: 20px 0 20px;
}

.introduce {
  font-size: 16px;
  font-weight: 400;
  color: #999;
  img {
    width: 16px;
    vertical-align: middle;
    margin-right: 7px;
  }
}
.select {
  margin: 45px 0 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.sel-row {
  display: block;
  width: 100%;
  border-radius: 10px;
  background: #fff;
  cursor: pointer;
  margin-bottom: 60px;
  box-shadow: 0px 12px 18px 2px rgba(130, 130, 130, 0.06);
  .inner {
    display: flex;
    cursor: pointer;
    width: 100%;
    padding: 35px 70px;
    align-items: center;
    justify-content: space-between;
  }
  .cover {
    display: flex;
    align-items: center;
    .pic-img {
      flex: 1;
      img {
        width: 120px;
      }
    }
  }
  .enter {
    display: flex;
    align-items: center;
    .text {
      font-size: 16px;
      justify-content: center;
      display: flex;
      align-items: center;
      font-weight: bold;
      margin-right: 50px;
    }
    .pic-icon {
      width: 30px;
    }
  }
}

.border-box {
  flex: 1;
  padding-left: 40px;
  display: flex;
  flex-direction: column;
  .border-1 {
    margin: 12px 0;
    width: 68px;
    height: 12px;
    background: #ebebeb;
    border-radius: 6px;
  }
  .border-2 {
    width: 110px;
    height: 7px;
    background: #ebebeb;
    border-radius: 4px;
  }
  .border-3 {
    margin: 9px 0 17px;
    width: 55px;
    height: 7px;
    background: #ebebeb;
    border-radius: 4px;
  }
}
.external {
  margin-bottom: 50px;
}
.green-link {
  font-size: 16px;
  font-weight: 400;
  color: $primaryColor;
  line-height: 24px;
}
</style>

