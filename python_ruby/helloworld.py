import math

print("Hello, 파이썬!")

print(10+5)
print(math.ceil(2.24))
print(math.floor(2.24))
print(math.pow(2,10))   #2의 10승: 1024.0
print(math.sqrt(16))
print(math.pi)

print('Hello')
print("Hello")
print("Hello 'world'")
print('Hello "world"')

print('Hello '+'world')
print('Hello '*3)       # Hello Hello Hello
print('Hello'[0])
print('Hello'[1])
print('Hello'[2])

print('hello world'.capitalize())
print('hello world'.upper())
print('hello world'.__len__())
print(len('hello world'))
print('Hello world'.replace('world', 'programming'))


print("egoing's \"tutorial\"")
print("\\")
print("Hello\nworld")
print("Hello\t\tworld")
print("\a")                 # 경고음 출력
print('Hello\nworld')       # 개행됨

x=10
y=5
print(x+y)

title = "python & ruby"
print("Title is " + title)

a=1
b=1
print(a==b)
print(1==2)
print(1>2)
print(1<2)
print(True)
print(False)

print("============조건문============")

if True:
    print("code1")
    print("code2")
print("code3")

'''
inputs = 33
real_egoing = 11
real_k8805 = "ab"
if real_egoing == input:
  print("Hello!, egoing")
elif real_k8805 == input:
  print("Hello!, k8805")
else:
  print("Who are you?")
'''


print("============입출력============")
'''
input_id = input("아이디를 입력해주세요.\n")
input_pwd = input("비밀번호를 입력해주세요.\n")
real_id = "egoing"
real_pwd = "11"
if real_id == input_id and real_pwd == input_pwd:
    print("Hello!")
else:
    print("로그인에 실패했습니다")
'''
print("============반복문============")

i = 0
while i < 10:
    print('print("Hello world '+str(i*9)+'")')
    i = i + 1


i = 0
while i < 10:
    if i == 4:
        break
    print(i)
    i = i + 1
print('after while')

members = ['egoing', 'leezche', 'graphittie']
for member in members:
    print(member)

for item in range(5, 11):
    print(item)

'''
input_id = input("아이디를 입력해주세요.\n")
members = ['egoing', 'k8805', 'leezche']
for member in members:
    if member == input_id:
        print('Hello!, '+member)
        import sys
        sys.exit()
print('Who are you?')
'''

print("============함수============")

def a3():
    print('aaa')
a3()

def a3():
    return 'aaa'
print(a3())

def make_string(str, num):
    return str*num
print(make_string('b', 3))

print("============모듈============")
'''
import egoing, dubero       # egoing.py 와 dubero.py 파일 로드
import dubero as k          # dubero.py 를 k 라는 이름으로 임포트
from dubero import a as z   # egoing.py 에서 a 함수만 임포트

def a():
    return 'B'
print(egoing.a())
print(k.a())
print(z())
'''

print("============클래스============")
class Cal(object):
    def __init__(self, v1, v2):
        if isinstance(v1, int):
            self.v1 = v1            #기본적으로 외부에서 접근 가능
            #self.__v1 = v1         #외부에서 직접접근을 막을때
        if isinstance(v2, int):
            self.v2 = v2
        #print(v1, v2)
    def add(self):
        return self.v1+self.v2
    def subtract(self):
        return self.v1-self.v2
    def setV1(self, v):
        if isinstance(v, int):      #자료형 체크
            self.v1 = v
    def getV1(self):
        return self.v1
c1 = Cal(10,10)
print(c1.add())
print(c1.subtract())
c1.setV1('one')
c1.v2 = 30
print(c1.add())

print("============상속============")
class Class1(object):
    def method1(self):
        return 'm1'
c2 = Class1()
print(c2, c2.method1())

class Class3(Class1):
    def method2(self): return 'm2'
c3 = Class3()
print(c3, c3.method1())
print(c3, c3.method2())
