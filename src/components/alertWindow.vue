<template>
    <div>

        <div class="dialog-wrapper" v-if="">
            <div class="dialog-container2">
                <h4>确定{{name}}不通过审核吗？</h4>
                <div class="btn-wrapper">
                    <div @click="">取消</div>
                    <div @click="">确定</div>
                </div>
            </div>
        </div>


        <div class="dialog-wrapper" v-if="">
            <div class="dialog-container2">
                <h4>修改成功！</h4>
                <div class="btn-wrapper" style="justify-content: flex-end;">
                    <div @click="">好的</div>
                </div>
            </div>
        </div>



    </div>

</template>