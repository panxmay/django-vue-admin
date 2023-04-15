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
from dvadmin.system.models import Dictionary1
from dvadmin.utils.json_response import SuccessResponse
from dvadmin.utils.serializers import CustomModelSerializer
from dvadmin.utils.viewset import CustomModelViewSet


class Dictionary1Serializer(CustomModelSerializer):
    """
    字典-序列化器
    """

    multi666 = serializers.ListField()

    class Meta:
        model = Dictionary1
        fields = "__all__"
        read_only_fields = ["id"]

class Dictionary1CreateUpdateSerializer(CustomModelSerializer):
    """
    字典管理 创建/更新时的列化器
    """

    class Meta:
        model = Dictionary1
        fields = '__all__'

class Dictionary1ViewSet(CustomModelViewSet):
    """
    字典管理接口
    list:查询
    create:新增
    update:修改
    retrieve:单例
    destroy:删除
    """
    queryset = Dictionary1.objects.all()
    serializer_class = Dictionary1Serializer
    extra_filter_backends = []
    search_fields = ['label']