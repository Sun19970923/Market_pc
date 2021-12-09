<template>
<div class="tab-content-list">
  <div v-for="(owner, index) in owners" :key="index" class="info-item">
    <div class="avatar">
      <avatar @click="goAccount(owner.address)" shape="circular" :imageUrl="$filters.fullImageUrl(owner.avatar)" :address="owner.address" :imgWidth="35" :imgHeight="35"></avatar>
    </div>
    <div v-if="!owner.onsell" class="info">
      <div class="label">{{owner.quantity}} {{$t('details.text1')}}</div>
      <div @click="goAccount(owner.address)" class="name">
        <span class="text">
          {{owner.nickname || $filters.ellipsisAddress(owner.address) }}
        </span>
        <span class="t">{{owner.time}}</span>
      </div>
    </div>
    <div v-else class="info">
      <div class="label flex">
        <div class="label-left">
        {{ getStockValue(owner) }} {{$t('details.text2')}} <span class="bfont"> {{$tools.singlePrice(owner.price, owner.sellValue)}}{{owner.payToken.symbol}} </span>
        </div>
        <span v-if="!user || user.coinbase == owner.address" class="nft-op cancel" @click="cancel(owner)">{{$t('details.cancel')}}</span>
        <span v-else class="nft-op" @click="buy(owner)">{{$t('details.buy')}}</span>
      </div>

      <div @click="goAccount(owner.address)" class="name">
        <span class="text" >
          {{ owner.nickname || $filters.ellipsisAddress( owner.address ) }}
        </span>
        <span class="t">{{ $filters.timeFormat(owner.createTime) }}</span>
      </div>
    </div>
  </div>
</div>

</template>
<script>
import { computed } from 'vue'

export default {
  name: "Owners",
  props: {
    owners: {
      type: Array,
      default: [],
    }
  },
  data(){
    return {}
  },
  computed:{
    user(){
      return this.$store.state.user;
    }
  },
  methods: {
    cancel(owner){
      this.$emit('cancel', owner);
    },
    getStockValue(owner){
      let stockValue = owner.sellValue - owner.completed;
      if(stockValue > owner.quantity) stockValue = owner.quantity;
      return stockValue;
    },
    buy(){
      this.$emit('buy', this.asset);
    },
    goAccount(address){
      this.$router.push({ path: "/account/"+address });
    }
  }
}
</script>
