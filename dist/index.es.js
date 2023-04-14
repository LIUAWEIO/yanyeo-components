import { defineComponent, reactive, ref, watch, openBlock, createBlock, unref, withCtx, createVNode, createElementVNode, toDisplayString, createElementBlock, Fragment, renderList, createTextVNode } from 'vue';
import ASelect from 'ant-design-vue/es/select';
import AInput from 'ant-design-vue/es/input';
import ADivider from 'ant-design-vue/es/divider';
import ATooltip from 'ant-design-vue/es/tooltip';

const _hoisted_1 = { style: { "padding": "4px 8px", "cursor": "pointer" } };
var script = /*#__PURE__*/ defineComponent({
    __name: 'TelephoneNumber',
    props: {
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
            type: Array,
        },
        langObj: {
            type: Object,
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
    },
    emits: ["update:value", "update:hintVisible", "check"],
    setup(__props, { emit }) {
        const props = __props;
        const ASelectOption = ASelect.Option;
        const VNodes = (_, { attrs }) => {
            return attrs.vnodes;
        };
        const langObj = reactive({
            inputPlaceholder: props.langObj.inputPlaceholder || "请输入",
            selectPlaceholder: props.langObj.selectPlaceholder || "请选择",
            prompt: props.langObj.prompt || "选择常用的地区/国家,或手动输入",
        });
        const inputValue = ref("");
        const areaCodeValue = ref("");
        const inputFocus = () => {
            emit("update:hintVisible", false);
        };
        const updateFunc = (check = false) => {
            emit("update:value", areaCodeValue.value + " " + inputValue.value);
            if (check)
                emit("check");
        };
        const areaCodeChange = (e) => {
            areaCodeValue.value = e;
            updateFunc(true);
        };
        const areaCodeInput = (e) => {
            const value = e.target.value;
            if (value) {
                areaCodeValue.value = (value.charAt(0) === "+" ? "" : "+") + value;
                updateFunc();
            }
            else {
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
            }
            else {
                areaCodeValue.value = "+86";
                inputValue.value = "";
            }
            updateFunc();
        };
        watch(() => props.value, () => {
            setValue();
        }, { immediate: true });
        return (_ctx, _cache) => {
            return (openBlock(), createBlock(unref(ATooltip), {
                placement: "right",
                visible: props.hintVisible,
                title: __props.hintTxt,
                color: "red"
            }, {
                default: withCtx(() => [
                    createVNode(unref(AInput), {
                        value: inputValue.value,
                        "onUpdate:value": _cache[2] || (_cache[2] = ($event) => ((inputValue).value = $event)),
                        onInput: _cache[3] || (_cache[3] = ($event) => (updateFunc())),
                        onBlur: _cache[4] || (_cache[4] = ($event) => (updateFunc(true))),
                        onFocus: _cache[5] || (_cache[5] = ($event) => (inputFocus())),
                        placeholder: langObj.inputPlaceholder,
                        maxlength: 32,
                        clearable: ""
                    }, {
                        addonBefore: withCtx(() => [
                            createVNode(unref(ASelect), {
                                style: { "width": "90px" },
                                dropdownMatchSelectWidth: false,
                                optionLabelProp: "code",
                                showSearch: "",
                                value: areaCodeValue.value,
                                placeholder: langObj.selectPlaceholder,
                                onChange: _cache[0] || (_cache[0] = ($event) => (areaCodeChange($event))),
                                onInput: areaCodeInput,
                                onBlur: _cache[1] || (_cache[1] = ($event) => (updateFunc(true)))
                            }, {
                                dropdownRender: withCtx(({ menuNode: menu }) => [
                                    createVNode(VNodes, { vnodes: menu }, null, 8 /* PROPS */, ["vnodes"]),
                                    createVNode(unref(ADivider), { style: { "margin": "4px 0" } }),
                                    createElementVNode("div", _hoisted_1, toDisplayString(langObj.prompt), 1 /* TEXT */)
                                ]),
                                default: withCtx(() => [
                                    (openBlock(true), createElementBlock(Fragment, null, renderList(__props.areaCode, (item) => {
                                        return (openBlock(), createBlock(unref(ASelectOption), {
                                            key: item.code,
                                            label: item.code,
                                            value: item.code
                                        }, {
                                            default: withCtx(() => [
                                                createTextVNode(toDisplayString(item.name + " " + item.code), 1 /* TEXT */)
                                            ]),
                                            _: 2 /* DYNAMIC */
                                        }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["label", "value"]));
                                    }), 128 /* KEYED_FRAGMENT */))
                                ]),
                                _: 1 /* STABLE */
                            }, 8 /* PROPS */, ["value", "placeholder"])
                        ]),
                        _: 1 /* STABLE */
                    }, 8 /* PROPS */, ["value", "placeholder"])
                ]),
                _: 1 /* STABLE */
            }, 8 /* PROPS */, ["visible", "title"]));
        };
    }
});

script.__file = "src/TelephoneNumber.vue";

export { script as TelephoneNumber };
