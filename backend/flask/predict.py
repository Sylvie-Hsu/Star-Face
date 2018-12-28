# -*- coding: utf-8 -*-
"""
Created on Thu Dec 27 10:46:59 2018

@author: crystal
"""
import os,dlib
import numpy as np
import pickle
from skimage import io
import matplotlib.pyplot as plt

filename1='descriptors.data'
f1=open(filename1,'rb')
descriptors=pickle.load(f1)
f1.close()
filename2='candidate.data'
f2=open(filename2,'rb')
candidate=pickle.load(f2)
f2.close()

predictor_path='shape_predictor_68_face_landmarks.dat'
face_rec_model_path='dlib_face_recognition_resnet_model_v1.dat'
detector=dlib.get_frontal_face_detector()  #基于HOG的特征提取
sp=dlib.shape_predictor(predictor_path)   #此处用了两个输入，一是原图，二是特征提取结果，输出为人脸的矩形区域范围
facerec=dlib.face_recognition_model_v1(face_rec_model_path)

try:
    print('用户图片：')
    test_path='夏雨.jpg'
    img=io.imread(test_path)
    io.imshow(img)
    plt.show()
    dets=detector(img,1)
except:
    print('输入路径有误')

dist=[]
for k,d in enumerate(dets):
    shape=sp(img,d)
    face_descriptor=facerec.compute_face_descriptor(img,shape)
    d_test=np.array(face_descriptor)
    for i in descriptors:
        dist_=np.linalg.norm(i-d_test)  #计算已有的descriptor中各特征向量与待测图片特征向量的欧式距离
        dist.append(dist_)

        
c_d=dict(zip(candidate,dist))
cd_sorted=sorted(c_d.items(),key=lambda d:d[1])
score=1-np.power(cd_sorted[0][1],3)
print('与之最相似的是：%s, 相似度：%f'%(cd_sorted[0][0],score))


path=os.path.join('train_img',cd_sorted[0][0])
path.replace('\\','/')
path=path+'.jpg'
img=io.imread(path)
io.imshow(img)
plt.show()
    