'use client';

import { useState } from 'react';
import { Edit2, Check, X } from 'lucide-react';
import { AdVariation } from '../types';

interface AdCardProps {
  variation: AdVariation;
  variant: 'viewOnly' | 'editable';
  isSelected?: boolean;
  onSelect?: () => void;
  onCustomize?: (updates: Partial<AdVariation>) => void;
}

export function AdCard({ 
  variation, 
  variant, 
  isSelected, 
  onSelect, 
  onCustomize 
}: AdCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCopy, setEditedCopy] = useState(
    variation.customizedCopy || variation.generatedCopy
  );

  const handleSaveEdit = () => {
    if (onCustomize) {
      onCustomize({ customizedCopy: editedCopy });
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedCopy(variation.customizedCopy || variation.generatedCopy);
    setIsEditing(false);
  };

  const displayCopy = variation.customizedCopy || variation.generatedCopy;

  return (
    <div className={`card p-4 transition-all duration-150 ${
      isSelected ? 'ring-2 ring-primary' : ''
    }`}>
      {variant === 'editable' && onSelect && (
        <div className="flex items-center justify-between mb-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isSelected || false}
              onChange={onSelect}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-sm font-medium">Select for posting</span>
          </label>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 text-muted-foreground hover:text-text transition-colors duration-150"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      <div className="space-y-4">
        {/* Visual */}
        <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-md flex items-center justify-center">
          <span className="text-sm text-muted-foreground">AI-Generated Visual</span>
        </div>

        {/* Copy */}
        <div className="space-y-3">
          {isEditing ? (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  Headline
                </label>
                <input
                  type="text"
                  value={editedCopy.headline}
                  onChange={(e) => setEditedCopy({ ...editedCopy, headline: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  Body Text
                </label>
                <textarea
                  value={editedCopy.bodyText}
                  onChange={(e) => setEditedCopy({ ...editedCopy, bodyText: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  Call to Action
                </label>
                <input
                  type="text"
                  value={editedCopy.cta}
                  onChange={(e) => setEditedCopy({ ...editedCopy, cta: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleSaveEdit}
                  className="flex items-center space-x-1 px-3 py-1 bg-primary text-white rounded-md text-sm hover:opacity-90"
                >
                  <Check className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="flex items-center space-x-1 px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <h3 className="font-semibold text-text">{displayCopy.headline}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {displayCopy.bodyText}
              </p>
              <div className="inline-block px-3 py-1 bg-primary text-white text-sm rounded-md">
                {displayCopy.cta}
              </div>
            </div>
          )}
        </div>

        {/* Performance metrics if available */}
        {variation.performanceMetrics && (
          <div className="pt-3 border-t">
            <h4 className="text-xs font-medium text-muted-foreground mb-2">Performance</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Views:</span>
                <span className="ml-1 font-medium">{variation.performanceMetrics.views}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Likes:</span>
                <span className="ml-1 font-medium">{variation.performanceMetrics.likes}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
