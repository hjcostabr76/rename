# import pytube
import pytubefix
import ffmpeg
import openai

# Download audio file
import sys
url = sys.argv[1]
filename = 'audio.wav'
yt = pytubefix.YouTube(url)
# yt.streams.filter(only_audio=True).first().download(filename=filename)
stream = yt.streams[0].url
ffmpeg.input(stream).output(filename, format='wav', loglevel='error').run()

# Create transcript
audio_file = open(filename, "rb")
# transcript = openai.Audio.transcribe("whisper-1", filename)
transcript = client.audio.transcriptions.create(
    model="whisper-1",
    file=audio_file,
).text

# Ask for revision
# completion = openai.ChatCompletion.create(
completion = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {
            'role': 'system',
            'content': """
                You are an assistant that creates summaries of video clips.
                Give the results in markdown format.
            """
        },
        {
            'role': 'user',
            'content': f'Describe the following video clip: {transcript}'
        }
    ]
)

with open("summary.md", "w") as md:
    md.write(completion.choices[0].message.content)

def main():
    print("Hello from rename!")


if __name__ == "__main__":
    main()
