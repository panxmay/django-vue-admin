# -*- coding: utf-8 -*-

"""
@author: 猿小天
@contact: QQ:1638245306
@Created on: 2021/6/3 003 0:30
@Remark: 字典管理
"""
from rest_framework import serializers
from rest_framework.views import APIView

from application import dispatch
from dvadmin.system.models import ModelsIn
from dvadmin.utils.json_response import SuccessResponse
from dvadmin.utils.serializers import CustomModelSerializer
from dvadmin.utils.viewset import CustomModelViewSet


class ModelsInSerializer(CustomModelSerializer):
    """
    字典-序列化器
    """

    multi666 = serializers.ListField()

    class Meta:
        model = ModelsIn
        fields = "__all__"
        read_only_fields = ["id"]


class ModelsInInitSerializer(CustomModelSerializer):
    """
    初始化获取数信息(用于生成初始化json文件)
    """
    children = serializers.SerializerMethodField()

    def get_children(self, obj: ModelsIn):
        data = []
        instance = ModelsIn.objects.filter(parent_id=obj.id)
        if instance:
            serializer = ModelsInInitSerializer(instance=instance, many=True)
            data = serializer.data
        return data

    def save(self, **kwargs):
        instance = super().save(**kwargs)
        children = self.initial_data.get('children')
        # 菜单表
        if children:
            for data in children:
                data['parent'] = instance.id
                filter_data = {
                    "value": data['value'],
                    "parent": data['parent']
                }
                instance_obj = ModelsIn.objects.filter(**filter_data).first()
                if instance_obj and not self.initial_data.get('reset'):
                    continue
                serializer = ModelsInInitSerializer(instance_obj, data=data, request=self.request)
                serializer.is_valid(raise_exception=True)
                serializer.save()
        return instance

    class Meta:
        model = ModelsIn
        fields = fields = '__all__'
        read_only_fields = ["id"]
        extra_kwargs = {
            'creator': {'write_only': True},
            'dept_belong_id': {'write_only': True}
        }


class ModelsInCreateUpdateSerializer(CustomModelSerializer):
    """
    字典管理 创建/更新时的列化器
    """

    class Meta:
        model = ModelsIn
        fields = '__all__'


class ModelsInViewSet(CustomModelViewSet):
    """
    字典管理接口
    list:查询
    create:新增
    update:修改
    retrieve:单例
    destroy:删除
    """
    queryset = ModelsIn.objects.all()
    serializer_class = ModelsInSerializer
    extra_filter_backends = []
    search_fields = ['label']


class InitModelsInViewSet(APIView):
    """
    获取初始化配置
    """
    authentication_classes = []
    permission_classes = []
    queryset = ModelsIn.objects.all()

    def get(self, request):
        ModelsIn_key = self.request.query_params.get('ModelsIn_key')
        if ModelsIn_key:
            if ModelsIn_key == 'all':
                data = [ele for ele in dispatch.get_ModelsIn_config().values()]
                if not data:
                    dispatch.refresh_ModelsIn()
                    data = [ele for ele in dispatch.get_ModelsIn_config().values()]
            else:
                data = self.queryset.filter(parent__value=ModelsIn_key, status=True).values('id','label')
            return SuccessResponse(data=data, msg="获取成功")
        return SuccessResponse(data=[], msg="获取成功")
