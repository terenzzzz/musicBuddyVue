<template>
    <div class="p-5 pt-0">
        <div class="d-flex justify-content-end">
            <button class="btn btn-sm btn-secondary" @click="downloadReceipt"><i class="fa-solid fa-download"></i></button>
        </div>
        <div id="receipt" class="container card  border-0">
        <div class="row">
            <div class="col-md-12">
                <h3 class="text-center">RECEIPT</h3>
                <p class="text-center">{{ title }}</p>
            </div>
        </div>
        <div class="row ">
            <div class="col-md-12 ">
                <p class="text-start">ORDER #0001 </p>
                <p class="text-start">{{ getCurrentFormattedDate() }}</p>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-3 col-md-2">QTY</div>
            <div class="col-6 col-md-8">ITEM</div>
            <div class="col-3 col-md-2">AMT</div>
        </div>
        <hr>

        <div class="row my-2" v-for="(item, index) in tracks" :key="index">
            <div class="col-2 col-md-2">{{ index + 1 }}</div>
            <div class="col-7 col-md8">
                {{ item.name }} - {{ item.artist.name }}
            </div>
            <div class="col-3 col-md-2">{{ millisecondsToMMss(item.duration) }}</div>
        </div>

        <hr>
        <div class="row">
            <div class="col-12">
                <p>TIME COUNT: {{millisecondsToHHmmss(tracks.reduce((total, track) => total + track.duration, 0))}}</p>
                <p>ITEM COUNT: {{ tracks.length }}</p>
            </div>
        </div>
        <hr>

        <div class="row">
            <div class="col-md-12">
                <p>CARD #: **** **** **** 2024</p>
                <p>AUTH CODE: {{ user._id }}</p>
                <p>CARDHOLDER: {{ user.name }}</p>
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
import {getCurrentFormattedDate, millisecondsToHHmmss, millisecondsToMMss} from "@/utils/timeConverter";
import html2canvas from "html2canvas";
import {getUser} from "@/api/users";

export default {
    props:{
        tracks:{
          type: Array,
          required: true
        },
        title:{
            type: String,
            required: true
        },
    },
    components: {},
    data() {
        return {
            user: null
        };
    },

    created() {
        this.fetchUser()
    },
    methods: {
        millisecondsToMMss,
        getCurrentFormattedDate,
        millisecondsToHHmmss,
        async downloadReceipt() {
            const element = document.getElementById('receipt');
            const canvas = await html2canvas(element);
            const imgData = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = imgData;
            link.download = "receipt.png";
            link.click();
        },

        async fetchUser() {
            try {
                const response = await getUser(); // 传递适当的参数
                this.user = response.data.data;
            } catch (error) {
                console.error('Failed to fetch user:', error);
            }
        },
    }
}
</script>