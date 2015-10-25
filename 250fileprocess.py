file = open('file.csv', 'r')
file2 = open('flatfile.txt', 'w')
for line in file:
	st = line.rstrip()
	file2.write("'" + st[:-2] + "', ")

file2.close()
file.close()


