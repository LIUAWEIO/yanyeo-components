<template>
  <ATooltip
    placement="right"
    :visible="props.hintVisible"
    :title="hintTxt"
    color="red"
  >
    <AInput
      v-model:value="inputValue"
      @input="updateFunc()"
      @blur="updateFunc(true)"
      @focus="inputFocus()"
      :placeholder="langObj.inputPlaceholder"
      :maxlength="32"
      clearable
    >
      <template #addonBefore>
        <ASelect
          style="width: 90px"
          :dropdownMatchSelectWidth="false"
          optionLabelProp="code"
          showSearch
          :value="areaCodeValue"
          :placeholder="langObj.selectPlaceholder"
          @change="areaCodeChange($event as string)"
          @input="areaCodeInput"
          @blur="updateFunc(true)"
        >
          <ASelectOption
            v-for="item in areaCode"
            :key="item.code"
            :label="item.code"
            :value="item.code"
          >
            {{ item.name + " " + item.code }}
          </ASelectOption>
          <template #dropdownRender="{ menuNode: menu }">
            <v-nodes :vnodes="menu" />
            <ADivider style="margin: 4px 0" />
            <div style="padding: 4px 8px; cursor: pointer">
              {{ langObj.prompt }}
            </div>
          </template>
        </ASelect>
      </template>
    </AInput>
  </ATooltip>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from "vue";
import ASelect from "ant-design-vue/es/select";
import AInput from "ant-design-vue/es/input";
import ADivider from "ant-design-vue/es/divider";
import ATooltip from "ant-design-vue/es/tooltip";
import { areaType, langType } from "./type";

const ASelectOption = ASelect.Option;

const VNodes = (_, { attrs }) => {
  return attrs.vnodes;
};

const props = defineProps({
  value: {
    default: "",
    type: String,
  },
  areaCode: {
    default: () => [
      {
        code: "+86",
        name: "China(中国)",
      },
      {
        code: "+852",
        name: "Hong Kong,China(中国香港)",
      },
      {
        code: "+853",
        name: "Macao,China(中国澳门)",
      },
      {
        code: "+886",
        name: "Taiwan,China(中国台湾)",
      },
      {
        code: "+94",
        name: "Sri Lanka(斯里兰卡)",
      },
      {
        code: "+971",
        name: "The United Arab Emirates(阿拉伯联合酋长国)",
      },
    ],
    type: Array as () => areaType[],
  },
  langObj: {
    type: Object as () => Partial<langType>, //Partial<langType>，表示传入的对象可以包含 langType 类型的部分属性
    default: () => ({}),
  },
  // 输入框上面显示的提示
  hintTxt: {
    default: "手机号已存在",
    type: String,
  },
  hintVisible: {
    default: false,
    type: Boolean,
  },
});

const langObj = reactive<langType>({
  inputPlaceholder: props.langObj.inputPlaceholder || "请输入",
  selectPlaceholder: props.langObj.selectPlaceholder || "请选择",
  prompt: props.langObj.prompt || "选择常用的地区/国家,或手动输入",
});

const inputValue = ref("");
const areaCodeValue = ref("");

const emit = defineEmits<{
  (e: "update:value", value: string): void;
  (e: "update:hintVisible", value: Boolean): void;
  (e: "check"): void;
}>();

const inputFocus = () => {
  emit("update:hintVisible", false);
};

const updateFunc = (check: boolean = false) => {
  emit("update:value", areaCodeValue.value + " " + inputValue.value);
  if (check) emit("check");
};

const areaCodeChange = (e: string) => {
  areaCodeValue.value = e;
  updateFunc(true);
};
const areaCodeInput = (e: InputEvent) => {
  const value = (e.target as HTMLInputElement).value;
  if (value) {
    areaCodeValue.value = (value.charAt(0) === "+" ? "" : "+") + value;
    updateFunc();
  } else {
    areaCodeValue.value = props.areaCode[0].code;
    updateFunc();
  }
};

const setValue = () => {
  if (props.value) {
    areaCodeValue.value = props.value.includes(" ")
      ? props.value.split(" ")[0]
      : "+86";
    inputValue.value = props.value.includes(" ")
      ? props.value.split(" ")[1]
      : props.value;
  } else {
    areaCodeValue.value = "+86";
    inputValue.value = "";
  }
  updateFunc();
};

watch(
  () => props.value,
  () => {
    setValue();
  },
  { immediate: true }
);
</script>
