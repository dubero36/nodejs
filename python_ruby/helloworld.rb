

#print("Hello, 루비!")   #루비에서는 개행하지 않음

puts("Hello, 루비!")

puts(10+5)

puts(2.2.ceil())
puts(2.24.floor())
puts(2**10)     #2의 10승: 1024
puts(Math.sqrt(16))
puts(Math::PI)

puts('Hello')
puts("Hello")
puts("Hello 'world'")
puts('Hello "world"')

puts('Hello '+'world')
puts('Hello '*3)        # Hello Hello Hello
puts('Hello'[0])
puts('Hello'[1])
puts('Hello'[2])

puts('hello world'.capitalize())
puts('hello world'.upcase())
puts('Hello world'.length())
puts('Hello world'.sub('world', 'programming'))

puts("egoing's \"tutorial\"")
puts("\\")
puts("Hello\nworld")
puts("Hello\t\tworld")
puts("\a")
puts('Hello\nworld')        # Hello\nworld (개행안됨)

x=10
y=5
puts(x+y)

title = "python & ruby"
puts("Title is " + title)

a=1
b=1
puts(a==b)
puts(1==2)
puts(1>2)
puts(1<2)
puts(true)
puts(false)

puts("============조건문============")

if true
  puts("code1")
  puts("code2")
end
puts("code3")

input = 33
real_egoing = 11
real_k8805 = "ab"
if real_egoing == input
  puts("Hello!, egoing")
elsif real_k8805 == input
  puts("Hello!, k8805")
else
  puts("Who are you?")
end

puts("============입출력============")
=begin
puts("아이디를 입력해주세요")
input_id = gets.chomp()
puts("비밀번호를 입력해주세요")
input_pwd = gets.chomp()
real_id = "egoing"
real_pwd = "11"
if real_id == input_id and real_pwd == input_pwd
    puts("Hello!")
else
  puts("로그인에 실패했습니다")
end
=end

print("============반복문============")

i = 0
while i < 10 do
    puts('puts("Hello world '+(i*9).to_s()+'")')
    i = i + 1
end

i = 0
while i < 10 do
    if i == 4
        break
    end
    puts(i)
    i = i + 1
end
print('after while')

members = ['egoing', 'leezche', 'graphittie']
for member in members do
    puts(member)
end

for item in (5..10) do
  puts(item)
end

puts("아이디를 입력해주세요")
=begin
input_id = gets.chomp()
members = ['egoing', 'k8805', 'leezche']
for member in members do
    if member == input_id
        puts('Hello!, '+member)
        exit
    end
end
puts('Who are you?')
=end
puts("============반복문============")

def a3()
    puts('aaa')
end
a3()

def a3()
    return 'aaa'
end
puts(a3())

def make_string(str, num)
    return str*num
end
puts(make_string('b', 3))

puts("============코드블록============")
5.times() {|i| puts i}
2.times() {puts '2times'}
3.upto(5) {|item| puts item}

arr = ['A', 'B', 'C']
arr.each(){|i| puts i}

for value in arr
  puts value
end

arr = [1, 3, 56, 7, 13 , 52]
arr.delete_if() do |item|
  item > 7
end
puts arr

p "dubero fighting!"    #puts 와 같음

=begin
여러줄 주석
여러줄 주석
=end

puts("============클래스============")
class Cal
    #attr_reader :v1, :v2     #읽기 가능
    #attr_writer :v1          #쓰기 가능
    attr_accessor :v1         #읽기/쓰기 가능
    def initialize(v1,v2)
      @v1 = v1
      @v2 = v2
      #p v1, v2
    end
    def add()
      return @v1 + @v2
    end
    def subtract()
      return @v1 - @v2
    end
    def setV1(v)
      if v.is_a?(Integer)
        @v1 = v
      end
    end
    def getV1()
      return @v1
    end
end
c1 = Cal.new(10,10)
p c1.add()
p c1.subtract()
c1.setV1('one')
c1.v1 = 20
p c1.add()
p c1.getV1()

puts("============상속============")
