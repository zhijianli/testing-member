<template>
    <div>
        <div class="pop-up-wrap">
            <div class="pop-up-body">
                <div class="content">
                    <slot></slot>
                </div>


            </div>


        </div>
    </div>
</template>
<script>
   export default {
       data() {
           return {

           }
       }
   }
</script>
<style>
   .pop-up-wrap {
       position: fixed;
       top: 0;
       right: 0;
       bottom: 0;
       left: 0;
       background: rgba(0,0,0,.5);
       z-index: 99995;
       text-align: center;
       width: 100%;
       height: 100%;
   }
    .pop-up-body {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
    }

    .pop-up-body>.content {
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        margin: auto;
        position: absolute;
        background-color: white;
    }


</style>