<template>
    <div class="p-5">
        <div class="d-flex justify-content-end"><button class="btn btn-sm btn-secondary" @click="downloadReceipt"><i class="fa-solid fa-download"></i></button></div>
        <div id="receipt" class="container card  border-0">
        <div class="row">
            <div class="col-md-12">
                <h3 class="text-center">RECEIPT</h3>
                <p class="text-center">LAST MONTH</p>
            </div>
        </div>
        <div class="row ">
            <div class="col-md-12 ">
                <p class="text-start">ORDER #0001 FOR TERENZ</p>
                <p class="text-start">{{ getCurrentFormattedDate() }}</p>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-md-2">QTY</div>
            <div class="col-md-8">ITEM</div>
            <div class="col-md-2">AMT</div>
        </div>
        <hr>

        <div class="row my-2" v-for="(item, index) in tracks" :key="index">
            <div class="col-md-2">{{ index + 1 }}</div>
            <div class="col-md-8">
                {{ item.name }} - {{ item.artist.name }}
            </div>
            <div class="col-md-2">{{ millisecondsToMMss(item.duration) }}</div>
        </div>

        <hr>
        <div class="row">
            <div class="col-12">
                <p>ITEM COUNT: 123213</p>
                <p>TOTAL: 18</p>
            </div>
        </div>
        <hr>

        <div class="row">
            <div class="col-md-12">
                <p>CARD #: **** **** **** 2024</p>
                <p>AUTH CODE: 123421</p>
                <p>CARDHOLDER: TERENZ</p>
            </div>
        </div>
        <div class="row mt-5">
            <div class="col-md-12 text-center">
                <p>THANK YOU FOR VISITING!</p>
                <p>MUSICBUDDY.com</p>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import {getCurrentFormattedDate,millisecondsToMMss} from "@/utils/timeConverter";
import html2canvas from "html2canvas";

export default {
    props:{
      tracks:{
          type: Array,
          required: true
      }
    },
    components: {},
    data() {
        return {

        };
    },
    methods: {
        getCurrentFormattedDate,
        millisecondsToMMss,
        async downloadReceipt() {
            const element = document.getElementById('receipt');
            const canvas = await html2canvas(element);
            const imgData = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = imgData;
            link.download = "receipt.png";
            link.click();
        }
    }
}
</script>