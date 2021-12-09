<template>
  <div class="nft-item">
    <div class="inner">
      <div class="cover-padding">
        <div class="cover" @click="goDetail">
          <el-image
            class="cover-image"
            placeholder="loading"
            :src="$filters.fullImageUrl(nftURI.image)"
            fit="cover"
          >
            <template v-slot:placeholder>
              <el-skeleton class="placeholder-image" animated>
                <template #template>
                  <el-skeleton-item
                    class="nft-image-skeleton"
                    variant="h3"
                  />
                </template>
              </el-skeleton>
            </template>
            <template v-slot:error>
              <el-image
                class="error-image"
                :src="require('@/assets/create-img/non-existent.png')"
                fit="contain"
              ></el-image>
            </template>
          </el-image>

          <div
            class="collection-btn"
            :class="nft.like ? 'active' : ''"
            @click.stop="clickLike()"
          >
            <span
              class="iconfont"
              :class="nft.like ? 'icon-collection-fill' : 'icon-collection'"
            ></span>
          </div>
        </div>
      </div>
      <div class="descript">
        <div class="d">
          <div class="d-left d-top">
            <span @click="goDetail" class="bfont cpointer">{{ nftURI.name }}</span>
          </div>

          <div class="d-right" v-if="nft.itemList && nft.itemList.length">
            <span class="bid" @click="goDetail" v-if="highestBid">
              {{ highestBid.singlePrice }}{{ highestBid.payToken.symbol }}
            </span>
            <span class="bid" @click="goDetail" v-else-if="myAsset">
              {{ $t("nftItem.pab") }}
            </span>
            <span class="bid" @click="showDialog('bid')" v-else>
              {{$t("nftItem.pab")}}
            </span>
          </div>
        </div>
        <div class="d">
          <div class="d-left" v-if="ownerAsset">
            <template v-if="ownerAsset.onsell">
              <div class="avatar">
              <avatar
                @click="goUser(ownerAsset.address)"
                class="bflex cpointer"
                :imageUrl="$filters.fullImageUrl(ownerAsset.avatar)"
                :address="ownerAsset.address"
                :imgWidth="18"
                :imgHeight="18"
                shape="circular"
              ></avatar>
              </div>
 
              <span class="price bfont">
                {{ ownerAsset.singlePrice }}
                {{ ownerAsset.payToken ? ownerAsset.payToken.symbol : "" }}
              </span>
              <span class="stock">
                {{ ownerAsset.sellQuantity }} of {{ ownerAsset.quantity }}
              </span>
            </template>
            <template v-else>
              <span class="nosale bfont">{{ $t("nftItem.nfs") }}</span>
              <span class="stock"> 0 of {{ ownerAsset.quantity }}</span>
            </template>

          </div>
          <div class="d-left" v-else-if="lowestAsset">
            <div class="avatar">
            <avatar
              @click="goUser(lowestAsset.address)"
              class="bflex cpointer"
              :imageUrl="$filters.fullImageUrl(lowestAsset.avatar)"
              :address="lowestAsset.address"
              :imgWidth="18"
              :imgHeight="18"
              shape="circular"
            ></avatar>
            </div>
 
            <span class="price bfont">
              {{ lowestAsset.singlePrice }}
              {{ lowestAsset.payToken ? lowestAsset.payToken.symbol : "" }}
            </span>
            <span class="stock">
              {{ lowestAsset.sellQuantity }} of {{ nft.nft.quantity }}</span
            >
          </div>
          <div class="d-left" v-else>
            <span class="nosale bfont">{{ $t("nftItem.nfs") }}</span>
            <span class="stock"> 0 of {{ nft.nft.quantity }}</span>
          </div>


          <div class="d-right">
            <el-popover
              class="right-item"
              placement="top"
              popper-class="more-menu-popover"
              title=""
              :width="100"
              v-model:visible="visible"
            >
              <div class="menus">
                <template v-if="myAsset">
                  <div
                    class="menu"
                    v-if="lowestAsset && lowestAsset.address != myAsset.address"
                    @click="showDialog('buy', lowestAsset)"
                  >
                    {{ $t("nftItem.buy") }}
                  </div>

                  <div v-else-if="!myAsset.onsell" class="menu" @click="showDialog('sale', myAsset)">
                    {{ $t("nftItem.sale") }}
                  </div>


                  <template v-else>
                    <template v-if="myAsset.onsell">
                      <div
                        class="menu"
                        @click="showDialog('edit_sale', myAsset)"
                      >
                        {{ $t("nftItem.editSale") }}
                      </div>
                      <div
                        class="menu"
                        @click="showDialog('cancel_sale', myAsset)"
                      >
                        {{ $t("nftItem.cancelSale") }}
                      </div>
                    </template>
                  </template>

                  <template v-if="myAsset.quantity != nft.nft.quantity">
                    <div class="menu" v-if="!myBid" @click="showDialog('bid')">
                      {{ $t("nftItem.bid") }}
                    </div>
                    <template v-else>
                      <div class="menu" @click="showDialog('edit_bid', myBid)">
                        {{ $t("nftItem.editBid") }}
                      </div>
                      <div
                        class="menu"
                        @click="showDialog('cancel_bid', myBid)"
                      >
                        {{ $t("nftItem.cancelBid") }}
                      </div>
                    </template>
                  </template>


                  <div class="menu" @click="showDialog('transfer', myAsset)">
                    <img src="@/assets/img/nft/transfer.png" class="menu-icon" />
                    {{ $t("nftItem.transfer") }}
                  </div>
                  <div class="menu" @click="showDialog('burn', myAsset)">
                    <img src="@/assets/img/nft/destroy.png" class="menu-icon" />
                    {{ $t("nftItem.burn") }}
                  </div>

                </template>

                <template v-else>
                  <div
                    class="menu"
                    v-if="lowestAsset"
                    @click="showDialog('buy', lowestAsset)"
                  >
                    {{ $t("nftItem.buy") }}
                  </div>
                  <div class="menu" @click="showDialog('bid')" v-if="!myBid">
                    {{ $t("nftItem.bid") }}
                  </div>
                  <template v-else>
                    <div class="menu" @click="showDialog('edit_bid', myBid)">
                      {{ $t("nftItem.editBid") }}
                    </div>
                    <div class="menu" @click="showDialog('cancel_bid', myBid)">
                      {{ $t("nftItem.cancelBid") }}
                    </div>
                  </template>
                </template>
                <div
                  class="menu"
                  @click="showDialog('opensea')"
                  v-if="openseaUrl"
                >
                  {{ $t("nftDetail.viewOpensea") }}
                </div>
              </div>
              <template #reference>
                <span
                  @click="visible = true"
                  class="bfont iconfont icon-ellipsis"
                ></span>
              </template>
            </el-popover>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BigNumber from "bignumber.js";
import MixinsNFTInfo from "@/mixins/NftInfo";
export default {
  name: "NFTItem",
  mixins: [MixinsNFTInfo],
  props: {
    index: {
      type: [Number, String],
      default: "",
    },
    nft: {
      type: Object,
      default: {},
    },
    address: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      loading: true,
      visible: false,
      timer: "",
      countDown: "00:00:00"
    };
  },
  created() {
    this.$nextTick(function () {
      this.loading = false;
    });
  },
  mounted() {
    let that = this;
  },
  computed: {
    connected() {
      return this.$store.state.connected;
    },
    lowestAsset() {
      if (!this.nft.owners) return;
      let lowestAsset = this.getLowestAsset(this.nft.owners);
      return lowestAsset;
    },
    myAsset() {
      if (!this.connected || !this.nft.owners) return;

      let myAsset = this.getAddressAsset(this.nft.owners, this.user.coinbase);
      return myAsset;
    },
    ownerAsset() {
      if (!this.nft.owners || !this.address )  return;

      let ownerAsset = this.getAddressAsset(this.nft.owners, this.address);
      return ownerAsset;
    },
    myBid() {
      if (!this.connected || !this.nft.bids) return;
      return this.getActiveAddressBid(this.nft.bids, this.user.coinbase);
    },
    highestBid() {
      if (!this.nft.bids) return;
      return this.getHighestBid(this.nft.bids);
    },
    nftURI() {
      if (this.nft.nft.metadataContent) {
        return this.$tools.analysis(this.nft.nft.metadataContent);
      }else if (this.nft.media) {
        return this.$tools.analysis(this.nft.media);
      }
      return {};
    },
    user() {
      return this.$store.state.user;
    },
    openseaUrl(){
      return this.$store.state.openseaUrl;
    },
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
  methods: {
    thumbnail(url) {
      if (url) {
        if (url.endsWith(".gif")) return url;
        return url + "!300x300";
      } else {
        return "";
      }
    },
    goUser(address) {
      this.$router.push({ path: "/account/" + address });
    },
    clickLike() {
      let data = {
        address: this.nft.nft.address,
        tokenId: this.nft.nft.tokenId,
      };
      if (!this.nft.like) {
        this.$api("like.add", data).then((res) => {
          if (this.$tools.checkResponse(res)) {
            this.$emit("onLike", this.index, true);
          }
        });
      } else {
        this.$api("like.remove", data).then((res) => {
          if (this.$tools.checkResponse(res)) {
            this.$emit("onLike", this.index, false);
          }
        });
      }
    },
    showDialog(name, asset) {
      let nft = this.nft.nft;
      if (name == "opensea") {
        let url = this.openseaUrl + nft.address + "/" + nft.tokenId;
        window.open(url, "_blank");
        return;
      }
      if (!this.$tools.needLogin(this.$route.path)) return;
      let order = asset;
      this.$emit("showDialog", name, nft, order, this.asset, this.nftURI);
    },
    goDetail() {
      var ids = this.nft.nft.address + ":" + this.nft.nft.tokenId;
      this.$router.push("/detail/" + ids);
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-icon {
  width: 12px;
  margin-right: 7px;
  vertical-align: middle;
}
.huomiao-icon {
  width: 13px;
  height: 13px;
}
.d-right {
  .iconfont {
    font-size: 18px;
    margin-left: 5px;
    color: #aaa;
    cursor: pointer;
    &.active {
      color: $redColor;
    }
  }
}

.count-time{
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  padding: 5px;
  border-bottom-right-radius: 5px;
  background: $primaryColor;
  color: #fff;
}
.nft-item {
  width: 25%;
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin-bottom: 20px;
  padding: 0 10px;
  .inner {
    position: relative;
    background: #fff;
    border-radius: $borderRadius;
    overflow: hidden;
    --coverWidth: 100%;
  }
  .like {
    position: absolute;
    z-index: 100;
    right: 5px;
    top: 5px;
    .iconfont {
      cursor: pointer;
      margin-right: 5px;
      margin-top: 6px;
      font-size: 18px;
      border-radius: 18px;
      color: #aaa;
      &.active {
        color: $redColor;
      }
    }
  }
  .cover-padding {
    position: relative;
    padding-bottom: calc(var(--coverWidth) / 1.33);
  }
  .cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .hot-tip {
    display: flex;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 6px;
    border: 2px solid #3c4aff;
    padding: 5px;
    background-color: #fff;
  }
  .data-text {
    font-weight: bold;
    margin: 0px 10px;
  }
  .x-text-8A8A8A {
    color: #8a8a8a;
  }
  .collection-btn {
    width: 23px;
    height: 23px;
    text-align: center;
    line-height: 23px;
    position: absolute;
    right: 0;
    top: 0;
    background: #fff;
    border-bottom-left-radius: 5px;
    font-size: 16px;
    color: #666;
    &.active {
      color: #ffd200;
    }
  }
  .avatar {
    margin-right: 3px;
  }
  .descript {
    padding: 5px 0;
  }
  .d {
    padding: 5px;
    display: flex;
  }
  .d-left {
    display: flex;
    flex: 1;
    align-items: center;
  }
  .d-right {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-end;
  }
  .bid {
    white-space: nowrap;
    color: $primaryColor;
    cursor: pointer;
    font-weight: 400;
    font-size: 12px;
  }
  .price {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 12px;
    font-family: Montserrat-Regular;
    font-weight: 400;
    color: #1d1e22;
    margin-right: 5px;
  }
  .nosale {
    text-overflow: ellipsis;
    font-size: 12px;
    font-weight: 400;
    color: $grayColor;
  }
  .stock {
    display: flex;

    flex: 1;
    margin-left: 4px;
    margin-right: 6px;
    white-space: nowrap;
    font-size: 12px;
    font-weight: 400;
    color: #999;
    text-align: center;
  }
}
.bfont {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.d-top {
  width: 50%;
  flex: 0 !important;
}

.more-menu-popover {
  .menu {
    cursor: pointer;
    padding: 8px 7px;
    font-size: 13px;
    font-weight: normal;
    border-radius: $borderRadius;
    &:hover,
    &:active {
      background: #f0f0f0;
    }
  }
}

.sale-bid {
  display: flex;
  flex-direction: column;
  button {
    border: none;
    background: none;
    font-size: 14px;
    font-family: Montserrat-Regular;
    font-weight: 500;
    color: #1d1e22;
    line-height: 26px;
    cursor: pointer;
    &:hover {
      color: red;
      border-color: inherit;
      background-color: inherit;
    }
    &:focus {
      color: red;
      border-color: inherit;
      background-color: inherit;
    }
  }
}

@media screen and (max-width: 1320px) {
  .nft-item {
    width: 25%;
  }
}

@media screen and (max-width: 1040px) {
  .nft-item {
    width: 33.33%;
  }
}

@media screen and (max-width: 780px) {
  .nft-item {
    width: 50%;
  }
}

.nft-image-skeleton {
  width: 90%;
  height: 90%;
}
</style>
