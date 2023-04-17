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
from dvadmin.system.models import ProManage
from dvadmin.utils.json_response import SuccessResponse
from dvadmin.utils.serializers import CustomModelSerializer
from dvadmin.utils.viewset import CustomModelViewSet


class ProManageSerializer(CustomModelSerializer):
    """
    字典-序列化器
    """

    # multi666 = serializers.ListField()

    class Meta:
        model = ProManage
        fields = "__all__"
        read_only_fields = ["id"]

class ProManageCreateUpdateSerializer(CustomModelSerializer):
    """
    字典管理 创建/更新时的列化器
    """

    class Meta:
        model = ProManage
        fields = '__all__'

class ProManageViewSet(CustomModelViewSet):
    """
    字典管理接口
    list:查询
    create:新增
    update:修改
    retrieve:单例
    destroy:删除
    """
    queryset = ProManage.objects.all()
    serializer_class = ProManageSerializer
    extra_filter_backends = []
    search_fields = ['label']