#!/bin/sh

# dump subtitles from podcasts in all combinations of filters and codes

FILE="/Users/mfa/Desktop/ssteel.m4a"

# streams to try
STREAMS="0 1"

# ffmpeg bitstream filters, from `ffmpeg -bsfs`
FILTERS="text2movsub remove_extra noise mov2textsub mp3decomp mp3comp mjpegadump mjpeg2jpeg imxdump h264_mp4toannexb dump_extra chomp aac_adtstoasc"

# all the subtitle codecs from `ffmpeg -codecs` and 'copy'
SUBCODECS="copy dvb_subtitle dvb_teletext dvd_subtitle eia_608 hdmv_pgs_subtitle jacosub microdvd mov_text mpl2 pjs realtext sami srt ssa subrip subviewer subviewer1 text vplayer webvtt xsub"

# run it

for NR in $STREAMS; do
  
  for FILTER in $FILTERS; do
    
    for SUBCODEC in $SUBCODECS; do
    
      ffmpeg -i "$FILE" \
        -an -vn \
        -bsf:s $FILTER \
        -scodec copy \
        -f rawvideo -map 0:$NR \
        ""$FILE".sub_N"$NR"_SC"$SUBCODEC"_F"$FILTER".txt"
      
    done
  
  done
  
done