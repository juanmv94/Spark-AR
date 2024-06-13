# Usage: drag and drop .txt file

import sys

A4 = 440
C0 = A4* 2**-4.75
note = ["C-", "C#", "D-", "D#", "E-", "F-", "F#", "G-", "G#", "A-", "A#", "B-"]

def freq(pitch):
	h = note.index(pitch[:2]) + int(pitch[2])*12
	return round(C0*2**(h/12))

#print(freq("G-3"))

sq1f={0:0}; sq1v={0:0}; sq1d={0:0.5}; sq1e={0:0}; sq2f={0:0}; sq2v={0:0}; sq2d={0:0.5}; sq2e={0:0}; tf={0:0}; te={0:0}; nf={0:0}; nv={0:0}; ne={0:0}; sq3f={0:0}; sq3v={0:0}; sq3d={0:0.5}; sq3e={0:0}; sq4f={0:0}; sq4v={0:0}; sq4d={0:0.5}; sq4e={0:0}; sawf={0:0}; sawv={0:0}; sawe={0:0}; 
sq1le=0; sq2le=0; tle=0; nle=0; sq3le=0; sq4le=0; sawle=0; 
idx=0

with open(sys.argv[1]) as file:
	lines=file.readlines()
for l in lines:
	if l.startswith("ROW"):
		rowid, sq1, sq2, t, n, pcm, sq3, sq4, saw = [x.split(" ") for x in l.split(" : ")]
		if sq1[2]!='.': sq1v[idx]=int(sq1[2],16)
		if sq2[2]!='.': sq2v[idx]=int(sq2[2],16)
		#if t[2]!='.': tv[idx]=int(t[2],16)
		if n[2]!='.': nv[idx]=int(n[2],16)
		if sq3[2]!='.': sq3v[idx]=int(sq3[2],16)
		if sq4[2]!='.': sq4v[idx]=int(sq4[2],16)
		if saw[2]!='.': sawv[idx]=int(saw[2],16)

		if sq1[0]=='---':
			if sq1le!=0: sq1e[idx]=sq1le=0
		elif sq1[0]!='...':
			sq1f[idx]=freq(sq1[0])*2
			if sq1le==0: sq1e[idx]=sq1le=1
		if sq2[0]=='---':
			if sq2le!=0: sq2e[idx]=sq2le=0
		elif sq2[0]!='...':
			sq2f[idx]=freq(sq2[0])*2
			if sq2le==0: sq2e[idx]=sq2le=1
		if t[0]=='---':
			if tle!=0: te[idx]=tle=0
		elif t[0]!='...':
			tf[idx]=freq(t[0])
			if tle==0: te[idx]=tle=1
		if n[0]=='---':
			if nle!=0: ne[idx]=nle=0
		elif n[0]!='...':
			nf[idx]=(int(n[0][0],16)+2)**2*100
			if nle==0: ne[idx]=nle=1
		if sq3[0]=='---':
			if sq3le!=0: sq3e[idx]=sq3le=0
		elif sq3[0]!='...':
			sq3f[idx]=freq(sq3[0])*2
			if sq3le==0: sq3e[idx]=sq3le=1
		if sq4[0]=='---':
			if sq4le!=0: sq4e[idx]=sq4le=0
		elif sq4[0]!='...':
			sq4f[idx]=freq(sq4[0])*2
			if sq4le==0: sq4e[idx]=sq4le=1
		if saw[0]=='---':
			if sawle!=0: sawe[idx]=sawle=0
		elif saw[0]!='...':
			sawf[idx]=freq(saw[0])*2
			if sawle==0: sawe[idx]=sawle=1
		
		if sq1[4]!='...': sq1d[idx]=[0.125,0.25,0.5,0.75][int(sq1[4][2])]
		if sq2[4]!='...': sq2d[idx]=[0.125,0.25,0.5,0.75][int(sq2[4][2])]
		if sq3[4]!='...': sq3d[idx]=[0.125,0.25,0.5,0.75,0.875,0.9375,0.96875,0.984375][int(sq3[4][2])]
		if sq4[4]!='...': sq4d[idx]=[0.125,0.25,0.5,0.75,0.875,0.9375,0.96875,0.984375][int(sq4[4][2])]
		idx+=1
with open(sys.argv[1]+".js", "w") as file:
	file.write("// Auto-generated with NEStracker for Meta Spark by @Juanmv94\n\n")
	for l in (lines[3:6]): file.write("// "+l)
	file.write("const mrows="+str(idx)+";\n")
	file.write("const mspeed=16;\n")
	file.write("const mdata={\n\tsq1f:"+(str(sq1f)+",\n\tsq1v:"+str(sq1v)+",\n\tsq1d:"+str(sq1d)+",\n\tsq1e:"+str(sq1e)+",\n\tsq2f:"+str(sq2f)+",\n\tsq2v:"+str(sq2v)+",\n\tsq2d:"+str(sq2d)+",\n\tsq2e:"+str(sq2e)+",\n\ttf:"+str(tf)+",\n\tte:"+str(te)+",\n\tnf:"+str(nf)+",\n\tnv:"+str(nv)+",\n\tne:"+str(ne)+",\n\tsq3f:"+str(sq3f)+",\n\tsq3v:"+str(sq3v)+",\n\tsq3d:"+str(sq3d)+",\n\tsq3e:"+str(sq3e)+",\n\tsq4f:"+str(sq4f)+",\n\tsq4v:"+str(sq4v)+",\n\tsq4d:"+str(sq4d)+",\n\tsq4e:"+str(sq4e)+",\n\tsawf:"+str(sawf)+",\n\tsawv:"+str(sawv)+",\n\tsawe:"+str(sawe)+"\n};\n\n").replace(" ",""))
	file.write("module.exports = {mrows,mspeed,mdata};\n")