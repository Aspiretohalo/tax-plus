<template>
    <el-calendar>
      <template #date-cell="{ data }">
        <p :class="data.isSelected ? 'is-selected' : ''">
          {{ data.day.split('-').slice(1).join('-') }}
          {{ data.isSelected ? '✔️' : '' }}
          
          <el-button v-if="data.isSelected" @click="handleButtonClickOrExpand(data.isSelected)">展开</el-button>
        
        </p>
      </template>
    </el-calendar>
  
    <el-drawer v-model="visible" :show-close="false">
      <template #header="{ close, titleId, titleClass }">
        <h4 :id="titleId" :class="titleClass">今日任务</h4>
        <el-button type="danger" @click="close">
          <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
          Close
        </el-button>
      </template>
      <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :icon="activity.icon"
        :type="activity.type"
        :color="activity.color"
        :size="activity.size"
        :hollow="activity.hollow"
        :timestamp="activity.timestamp"
      >
        {{ activity.content }}
      </el-timeline-item>
    </el-timeline>
    </el-drawer>
    
  
  
  
  
  </template>
  
  
  
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  import { ElButton, ElDrawer } from 'element-plus'
  import { CircleCloseFilled } from '@element-plus/icons-vue'
  import { MoreFilled } from '@element-plus/icons-vue'
  
  // import { defineComponent } from 'vue';
  
  const visible = ref(false)
  
  const handleButtonClickOrExpand = (isSelected: boolean) => {
    if (isSelected) {
      // 处理按钮点击事件的逻辑
      visible.value = true; // 展开抽屉
    } else {
      
    }
  }
  
  const activities =[
    {
      content: '直播课1',
      timestamp: '2023-10-12 20:00',
      size: 'large',
      type: 'primary',
      icon: MoreFilled,
    },
    {
      content: '直播课2',
      timestamp: '2023-10-12 22:00',
      color: '#0bbd87',
    },
    {
      content: '录播课1',
      timestamp: '2023-10-12 22:30',
      size: 'large',
    },
    {
      content: '录播课2',
      timestamp: '2023-10-12 10:30',
      type: 'primary',
      hollow: true,
    },
    
  ]
  
  
  </script>
  
  <style>
  .is-selected {
    color: #1989fa;
  }
  </style>
  
  
  
  
  
  
  
  
  