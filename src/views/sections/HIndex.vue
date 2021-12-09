<template>
  <div class="carousel-section">
    <el-image class="banner-img" :src="banner" :fit="'fill'" height="600"></el-image>
    <div class="banner-context main-wrapper">
      <div>
        <el-image class="banner-title" :src="require('@/assets/image/legend.png')"> </el-image>
        <div class="des">Born for the <span style="font-weight: bold; color: #fff;">Territory</span></div>
      </div>
      <!-- <div class="tip">{{ $t('home.tip1')}}</div>
      <div class="tip">{{ $t('home.tip2') }}</div> -->
    </div>
  </div>
  <div class="main-wrapper">
    <div class="search-options">
      <div class="nft-sorts">
        <div class="nft-sorts-item" :class="sortKey == 'update_time' ? 'active' : ''" @click="seleteSort('update_time')">
          <span class="text">{{ $t('hindex.time') }}</span>
          <template v-if="sortKey == 'update_time'">
            <img v-if="sortValue == 'desc'" class="sort-icon" src="@/assets/img/sort_desc.png" />
            <img v-else class="sort-icon" src="@/assets/img/sort_asc.png" />
          </template>
          <img v-else class="sort-icon" src="@/assets/img/no_sort.png" alt="" />
        </div>
        <filter-and-sort :filters="filters" :filterId="filterId" @selectFilter="selectFilter"> </filter-and-sort>
      </div>
    </div>

    <div class="new-nft-list" v-infinite-scroll="loadNftList">
      <div class="nft">
        <nft-item v-for="(nft, i) in nftList" :nft="nft" :key="i" :index="i" @showDialog="showDialog" @onLike="onLike"> </nft-item>
        <nft-item-load :loadStatus="loadStatus"></nft-item-load>
      </div>
    </div>

    <sale-dialog :show="showSaleDialog" @close="closeDialog" @confirm="dialogConfirm" :asset="dialogOrder" :nft="dialogNft" :uri="dialogNftURI"> </sale-dialog>
    <cancel-sale-dialog :show="showCancelSaleDialog" @close="closeDialog" @confirm="dialogConfirm" :asset="dialogOrder" :nft="dialogNft" :uri="dialogNftURI"> </cancel-sale-dialog>
    <buy-dialog :show="showBuyDialog" @close="closeDialog" @confirm="dialogConfirm" :asset="dialogOrder" :nft="dialogNft" :uri="dialogNftURI"> </buy-dialog>

    <bid-dialog :show="showBidDialog" @close="closeDialog" @confirm="dialogConfirm" :bid="dialogOrder" :nft="dialogNft" :uri="dialogNftURI"> </bid-dialog>
    <cancel-bid-dialog :show="showCancelBidDialog" @close="closeDialog" @confirm="dialogConfirm" :bid="dialogOrder" :nft="dialogNft" :uri="dialogNftURI"> </cancel-bid-dialog>
    <accept-dialog :show="showAcceptDialog" @close="closeDialog" @confirm="dialogConfirm" :bid="dialogOrder" :nft="dialogNft" :uri="dialogNftURI"> </accept-dialog>
    <transfer-dialog :show="showTransferDialog" @close="closeDialog" @confirm="dialogConfirm" :asset="dialogOrder" :nft="dialogNft" :uri="dialogNftURI"> </transfer-dialog>
    <burn-dialog :show="showBurnDialog" @close="closeDialog" @confirm="dialogConfirm" :asset="dialogOrder" :nft="dialogNft" :uri="dialogNftURI"> </burn-dialog>
  </div>
</template>
<script>
import FilterAndSort from '@/components/FilterAndSort'
import NftDialog from '@/mixins/NftDialog'
import NftItem from '@/mixins/NftItem'
import NftInfo from '@/mixins/NftInfo'

export default {
  name: 'HIndex',
  components: {
    FilterAndSort,
  },
  mixins: [NftDialog, NftItem, NftInfo],
  data: function() {
    return {
      banner: require('@/assets/image/bg.jpg'),
      sortKey: '',
      filterId: '',
      filters: [],
      sortValue: '',
      nftList: [],
      query: {
        page: 1,
        limit: this.$store.state.pageLimit,
      },
      loadStatus: '',
    }
  },
  created() {
    this.init()
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    currentNetwork() {
      return this.$store.state.currentNetwork
    },
  },
  methods: {
    reloadList() {
      this.query.page = 1
      this.getNftList()
    },
    async init() {
      this.getCategoryList()
      this.getNftList()
    },
    selectFilter(filterId) {
      this.filterId = this.filterId == filterId ? '' : filterId
      this.query.page = 1
      this.getNftList()
    },
    getCategoryList() {
      this.$api('category.list').then((res) => {
        if (this.$tools.checkResponse(res)) {
          this.filters = res.data
        }
      })
    },
    seleteSort(sort) {
      if (this.sortKey == sort) {
        this.sortValue = this.sortValue == 'asc' ? 'desc' : 'asc'
      } else {
        this.sortKey = sort
        this.sortValue = 'desc'
      }
      this.query.page = 1
      this.getNftList()
    },
    loadNftList() {
      if (this.loadStatus == 'over') return
      this.getNftList()
    },
    getNftList() {
      if (this.loadStatus == 'loading') return
      this.loadStatus = 'loading'
      var data = {
        page: this.query.page,
        limit: this.query.limit,
        cate: this.filterId,
        sort: this.sortKey,
        order: this.sortValue,
      }
      this.$api('home.list', data).then((res) => {
        if (this.$tools.checkResponse(res)) {
          if (data.page == 1) this.nftList = []
          this.nftList = this.nftList.concat(res.data.list)
          this.queryFunction(res.data.list)
          if (res.data.list.length < data.limit) {
            this.loadStatus = 'over'
          } else {
            this.query.page += 1
            this.loadStatus = ''
          }
        } else {
          this.$tools.message(res.errmsg)
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.sort-icon {
  width: 7px;
  height: 4px;
  margin-left: 5px;
}

.main-wrapper {
  padding-top: 0 !important;
}
.banner-img {
  width: 100%;
  height: auto;
}

.carousel-section {
  width: 100%;
  position: relative;
  .banner-context {
    position: absolute;
    left: 10vw;
    right: 0;
    top: 12vw;
    display: flex;
    justify-content: center;
    padding-right: 56vw;
  }
  .banner-title {
    width: 30vw;
  }
  .tip {
    font-size: 16px;
    color: #3c4784;
    margin-top: 20px;
  }
  .des {
    width: 30vw;
    text-align: center;
    font-size: 1.4vw;
    color: rgba(255, 255, 255, 0.5);
    padding-top: 1.4vw;
    padding-bottom: 1.4vw;
  }
}
.home-banner {
  padding-top: 60px;
  padding-bottom: 40px;
  background: #dce3eb;
}
.category-tags {
  display: flex;
}
.category-tags-item {
  background: none;
  border: none;
  color: #999;
  font-weight: bold;
  padding: 0;
  height: auto;
  margin: 0;
  margin-right: 20px;
  cursor: pointer;
  &.active {
    color: #333;
    border-bottom: 2px solid #333;
    border-radius: 0;
  }
}
.search-options {
  position: relative;
  display: flex;
  align-items: center;
  margin: 20px 0;
  justify-content: flex-end;
}
.nft-sorts {
  display: flex;
  align-items: center;
  line-height: 18px;
}
.nft-sorts-item {
  white-space: nowrap;
  display: flex;
  font-size: 13px;
  align-items: center;
  font-weight: 400;
  cursor: pointer;
  margin-right: 16px;
  .text {
    display: flex;
  }
  .sort-icon {
    display: flex;
    height: 13px;
    margin-left: 3px;
  }
  &.active {
    color: $primaryColor;
  }
}

.new-nft-list {
  margin: 0 -10px;
}
.nft {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

@media screen and (max-width: 550px) {
  .search-options {
    display: flex;
    flex-direction: unset;
  }
  .category-tags {
    background: #f4f4f4;
    border-radius: 5px;
    display: flex;
    margin-left: 0px;
    transform: inherit;
    justify-content: space-around;
  }
  .nft-sorts {
    display: flex;
    align-items: center;
    line-height: 18px;
  }
}
</style>
