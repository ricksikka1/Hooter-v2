from django import forms

from .models import Hoot

MAX_LEN = 240

class HootForm(forms.ModelForm):
    class Meta:
        model = Hoot
        fields = ['content']

    def clean_content(self):
        content = self.cleaned_data.get("content")
        if len(content) > MAX_LEN:
            raise forms.ValidationError("This hoot is too long")
        return content